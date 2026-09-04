-- ==============================================================================
-- NEXORA DATABASE INITIAL SCHEMA & RLS POLICIES
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES TABLE (Mirrors Supabase Auth Users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup by email and role
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Helper function: Check if current authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Trigger to automatically create a profile row upon auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, company, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'company',
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    name = EXCLUDED.name,
    company = COALESCE(EXCLUDED.company, public.profiles.company),
    updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 2. PROJECT REQUESTS TABLE (From public inquiry form)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.project_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    service_type TEXT,
    project_type TEXT,
    budget TEXT,
    timeline TEXT,
    details TEXT,
    status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK (
        status IN (
            'SUBMITTED',
            'UNDER_REVIEW',
            'ACCEPTED',
            'REJECTED',
            'IN_PROGRESS',
            'DELIVERED',
            'COMPLETED',
            'ON_HOLD',
            'CANCELLED'
        )
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_requests_client_id ON public.project_requests(client_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.project_requests(status);

-- ==============================================================================
-- 3. PROJECTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    request_id UUID REFERENCES public.project_requests(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'web',
    status TEXT NOT NULL DEFAULT 'IN_PROGRESS' CHECK (
        status IN (
            'REQUESTED',
            'UNDER_REVIEW',
            'ACCEPTED',
            'IN_PROGRESS',
            'DELIVERED',
            'COMPLETED',
            'ON_HOLD',
            'CANCELLED'
        )
    ),
    website_url TEXT,
    preview_url TEXT,
    technologies TEXT[] DEFAULT '{}'::TEXT[],
    cover_image TEXT,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    case_study JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    delivered_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);

-- ==============================================================================
-- 4. PROJECT UPDATES TABLE (Changelog & progress updates)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.project_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    message TEXT NOT NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_updates_project_id ON public.project_updates(project_id);

-- ==============================================================================
-- 5. PRODUCTS TABLE (Nexora in-house products)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial products
INSERT INTO public.products (name, slug, description)
VALUES 
    ('ServeQ', 'serve-q', 'Autonomous incident triage and observability pipeline for mission-critical microservices.')
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 6. REVIEWS TABLE (Client feedback on products)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    feedback TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id OR public.is_admin())
    WITH CHECK (auth.uid() = id OR public.is_admin());

CREATE POLICY "Admins have full access to profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- PROJECT REQUESTS POLICIES
-- ------------------------------------------------------------------------------
-- Anyone (authenticated or public visitor via API) can insert a new project request
CREATE POLICY "Anyone can submit a project request"
    ON public.project_requests FOR INSERT
    WITH CHECK (TRUE);

-- Clients can view requests assigned to them, admins can view all
CREATE POLICY "Clients can view their own requests, admins view all"
    ON public.project_requests FOR SELECT
    USING (client_id = auth.uid() OR public.is_admin());

-- Admins can update/delete project requests
CREATE POLICY "Admins can update project requests"
    ON public.project_requests FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete project requests"
    ON public.project_requests FOR DELETE
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- PROJECTS POLICIES
-- ------------------------------------------------------------------------------
-- Public can view published projects; clients can view their assigned projects; admins view all
CREATE POLICY "View projects policy"
    ON public.projects FOR SELECT
    USING (
        published = TRUE
        OR client_id = auth.uid()
        OR public.is_admin()
    );

CREATE POLICY "Admins can insert projects"
    ON public.projects FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update projects"
    ON public.projects FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete projects"
    ON public.projects FOR DELETE
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- PROJECT UPDATES POLICIES
-- ------------------------------------------------------------------------------
-- Clients can read updates for their assigned projects; admins read all
CREATE POLICY "View project updates policy"
    ON public.project_updates FOR SELECT
    USING (
        public.is_admin()
        OR EXISTS (
            SELECT 1 FROM public.projects
            WHERE projects.id = project_updates.project_id
            AND projects.client_id = auth.uid()
        )
    );

CREATE POLICY "Admins can insert project updates"
    ON public.project_updates FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update/delete project updates"
    ON public.project_updates FOR ALL
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- PRODUCTS POLICIES
-- ------------------------------------------------------------------------------
-- Public can read all products
CREATE POLICY "Public can view products"
    ON public.products FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins can manage products"
    ON public.products FOR ALL
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- REVIEWS POLICIES
-- ------------------------------------------------------------------------------
-- Public can view approved reviews; users can view their own; admins view all
CREATE POLICY "View reviews policy"
    ON public.reviews FOR SELECT
    USING (
        status = 'APPROVED'
        OR user_id = auth.uid()
        OR public.is_admin()
    );

-- Authenticated users can insert their own review
CREATE POLICY "Authenticated users can submit review"
    ON public.reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their pending review, admins can moderate all
CREATE POLICY "Update review policy"
    ON public.reviews FOR UPDATE
    USING (
        (auth.uid() = user_id AND status = 'PENDING')
        OR public.is_admin()
    )
    WITH CHECK (
        (auth.uid() = user_id AND status = 'PENDING')
        OR public.is_admin()
    );

CREATE POLICY "Admins can delete reviews"
    ON public.reviews FOR DELETE
    USING (public.is_admin());

-- ==============================================================================
-- 8. STORAGE BUCKET (For project images and deliverables)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('nexora-assets', 'nexora-assets', TRUE)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view nexora-assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'nexora-assets');

CREATE POLICY "Admins can upload to nexora-assets"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'nexora-assets' AND public.is_admin());

CREATE POLICY "Admins can update/delete nexora-assets"
    ON storage.objects FOR ALL
    USING (bucket_id = 'nexora-assets' AND public.is_admin());
