import { NextResponse } from "next/server"

const assetTypes: Record<string, string> = {
  vehicle: "Vehicle (Car, Ute, Truck)",
  equipment: "Equipment & Machinery",
  construction: "Construction Equipment",
  medical: "Medical Equipment",
  technology: "IT & Technology",
  other: "Other Asset",
}

const purchaseTimelines: Record<string, string> = {
  asap: "As soon as possible",
  "1month": "Within 1 month",
  "3months": "1-3 months",
  exploring: "Just exploring options",
}

const businessAges: Record<string, string> = {
  new: "Less than 1 year",
  "1-2": "1-2 years",
  "3-5": "3-5 years",
  "5plus": "5+ years",
}

const financeAmounts: Record<string, string> = {
  under25k: "Under $25,000",
  "25-50k": "$25,000 - $50,000",
  "50-100k": "$50,000 - $100,000",
  "100-250k": "$100,000 - $250,000",
  "250kplus": "$250,000+",
}

export async function POST(request: Request) {
  try {
    const { answers, contactInfo } = await request.json()

    // Build the email content
    const emailContent = `
New Asset Finance Quiz Submission
=================================

CONTACT DETAILS
---------------
Name: ${contactInfo.name}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone}
Additional Message: ${contactInfo.message || "None provided"}

QUIZ RESPONSES
--------------
Asset Type: ${assetTypes[answers.assetType] || answers.assetType}
Purchase Timeline: ${purchaseTimelines[answers.purchaseTimeline] || answers.purchaseTimeline}
Business Age: ${businessAges[answers.businessAge] || answers.businessAge}
Finance Amount: ${financeAmounts[answers.financeAmount] || answers.financeAmount}

---
Submitted via Spidi Finance Asset Quiz
    `.trim()

    // Send email using fetch to a simple email service
    // Using Resend API if RESEND_API_KEY is available, otherwise log to console
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Asset Finance Quiz <onboarding@resend.dev>",
          to: ["matt@spidifinance.com.au"],
          subject: `New Asset Finance Enquiry from ${contactInfo.name}`,
          text: emailContent,
          reply_to: contactInfo.email,
        }),
      })

      if (!res.ok) {
        console.error("Failed to send email via Resend:", await res.text())
        // Still return success to user - we can follow up manually
      }
    } else {
      // Log the submission if no email service is configured
      console.log("========================================")
      console.log("NEW QUIZ SUBMISSION (No email service configured)")
      console.log("Send this to: matt@spidifinance.com.au")
      console.log("========================================")
      console.log(emailContent)
      console.log("========================================")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing quiz submission:", error)
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}
