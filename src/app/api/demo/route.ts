import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, teamSize, selectedSlot, selectedTier } = body;

    const payload = {
      _subject: `[Nexora Demo] ServeQ Walkthrough Request: ${name || "Lead"} (${company || "Company"})`,
      _replyto: email,
      "Lead Name": name || "Not provided",
      "Lead Email": email || "Not provided",
      "Company Name": company || "Not specified",
      "Team Size": teamSize || "Not specified",
      "Preferred Time Slot": selectedSlot || "Not specified",
      "Selected Platform Tier": selectedTier || "Not specified",
      _template: "table",
      _captcha: "false",
    };

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
      message: resJson?.message || "Demo request sent successfully",
    });
  } catch (error) {
    console.error("Error submitting demo request:", error);
    return NextResponse.json({ success: true, message: "Demo request received" });
  }
}
