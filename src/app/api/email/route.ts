import { NextRequest, NextResponse } from "next/server";
import Email from "vercel-email";

// THIS CONFIG DECLARATION IS DEPRECATED. DO NOT USE IT.
/* export const config = {
  runtime: "edge",
}; */

export const runtime = "edge";

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

    // Send email
    await Email.send({
      to: process.env.PERSONAL_EMAIL!,
      from: process.env.EMAIL_USER!,
      subject: "Theo",
      text: `A new Theo has appeared: ${imageUrl}`,
      html: `<p><a href="${imageUrl}">View image</a></p><p><img src="${imageUrl}" alt="Theo" style="max-width: 500px;"/></p>`,
    });

    console.log("Email sent successfully with Vercel Email");

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
