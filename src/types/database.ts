export type UserRole = "client" | "admin";

export type ProjectRequestStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED";

export type ProjectStatus =
  | "REQUESTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED";

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Profile {
  id: string;
  name: string;
  email: string;
  company: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectRequest {
  id: string;
  client_id: string | null;
  name: string;
  email: string;
  company: string | null;
  service_type: string | null;
  project_type: string | null;
  budget: string | null;
  timeline: string | null;
  details: string | null;
  status: ProjectRequestStatus;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string | null;
  request_id: string | null;
  title: string;
  description: string | null;
  category: string;
  status: ProjectStatus;
  website_url: string | null;
  preview_url: string | null;
  technologies: string[];
  cover_image: string | null;
  published: boolean;
  case_study: {
    tagline?: string;
    challenge?: string;
    solution?: string;
    features?: string[];
    outcome?: string;
    metrics?: { label: string; value: string }[];
    testimonial?: {
      rating?: number;
      review?: string;
      client_name?: string;
      client_company?: string;
      date?: string;
      status?: string;
    };
  } | null;
  created_at: string;
  updated_at: string;
  delivered_at: string | null;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  status: string;
  message: string;
  created_by: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review: string;
  feedback: string | null;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
  // Joins
  profiles?: {
    name: string;
    company: string | null;
    avatar_url: string | null;
  };
  products?: {
    name: string;
    slug: string;
  };
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; name: string; email: string };
        Update: Partial<Profile>;
      };
      project_requests: {
        Row: ProjectRequest;
        Insert: Omit<ProjectRequest, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ProjectRequest>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Project>;
      };
      project_updates: {
        Row: ProjectUpdate;
        Insert: Omit<ProjectUpdate, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<ProjectUpdate>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Product>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Review>;
      };
    };
  };
}
