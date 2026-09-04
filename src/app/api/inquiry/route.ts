import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

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

    // 1. Persist to Supabase Database (project_requests)
    try {
      const adminClient = createAdminClient();
      await adminClient.from("project_requests").insert({
        name: name || "Anonymous Client",
        email: email || "unknown@client.com",
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
      _subject: `[Nexora Inquiry] New Lead: ${name || "Client"} (${company || "Individual"})`,
      _replyto: email,
      "Client Name": name || "Not provided",
      "Client Email": email || "Not provided",
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
        Referer: "https://nexorastudio.com",
        Origin: "https://nexorastudio.com",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) NexoraStudio/1.0",
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
    return NextResponse.json({ success: true, message: "Inquiry received" });
  }
}
