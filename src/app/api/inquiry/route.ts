import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      service,
      projectType,
      budget,
      timeline,
      details,
    } = body;

    // 1. Enforce user authentication - project inquiry requires a logged-in user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. You must be signed in to submit a project inquiry.",
        },
        { status: 401 }
      );
    }

    const clientId = user.id;
    const resolvedEmail = user.email || email;
    const adminClient = createAdminClient();

    // 2. Persist to Supabase Database (project_requests)
    try {
      await adminClient.from("project_requests").insert({
        client_id: clientId,
        name: name || "Anonymous Client",
        email: resolvedEmail || email || "unknown@client.com",
        company: company || null,
        service_type: service || null,
        project_type: projectType || null,
        budget: budget || null,
        timeline: timeline || null,
        details: details || null,
        status: "SUBMITTED",
      });
    } catch (dbErr) {
      console.error("Database save failed in /api/inquiry, continuing with email notification:", dbErr);
    }

    // 2. Prepare FormSubmit Email Payload
    const payload = {
      _subject: `[GROVIX Inquiry] New Lead: ${name || "Client"} (${company || "Individual"})`,
      _replyto: resolvedEmail || email,
      "Client Name": name || "Not provided",
      "Client Email": resolvedEmail || email || "Not provided",
      "Company / Business": company || "Not specified",
      "Service Requested": service || "Not specified",
      "Project Type": projectType || "Not specified",
      "Estimated Budget": budget || "Not specified",
      "Target Timeline": timeline || "Not specified",
      "Project Brief": details || "No details provided",
      _template: "table",
      _captcha: "false",
    };

    // 3. Forward to FormSubmit to deliver directly to studio inbox
    const response = await fetch("https://formsubmit.co/ajax/ayushman.rick007@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://grovixstudio.com",
        Origin: "https://grovixstudio.com",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) GrovixStudio/1.0",
      },
      body: JSON.stringify(payload),
    });

    const resJson = await response.json().catch(() => null);

    return NextResponse.json({
      success: true,
      message: resJson?.message || "Inquiry sent successfully",
    });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry submission." },
      { status: 500 }
    );
  }
}
