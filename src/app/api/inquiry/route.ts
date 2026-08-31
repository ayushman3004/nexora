import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, projectType, budget, timeline, details } = body;

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

    // Forward to FormSubmit to deliver directly to ayushman.rick007@gmail.com
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
