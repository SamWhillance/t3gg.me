import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Remove edge runtime as it doesn't support nodemailer
// export const config = {
//   runtime: 'edge',
// };
// export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No imageUrl provided" },
        { status: 400 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL || "",
        pass: process.env.GMAIL_APP_PASSWORD || "",
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL || "",
      to: process.env.PERSONAL_EMAIL || "",
      subject: "Theo",
      text: `A new Theo has appeared: ${imageUrl}`,
      html: `<p><a href="${imageUrl}">View image</a></p><p><img src="${imageUrl}" alt="Theo" style="max-width: 500px;"/></p>`,
    });

    console.log("Email sent to " + process.env.PERSONAL_EMAIL);

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: `Failed to send email: ${error}` },
      { status: 500 }
    );
  }
}
