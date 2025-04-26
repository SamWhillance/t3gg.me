import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    // Initialize the Replicate client with API token from env variable
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN || "",
    });

    // Parse the form data
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const theoImage = (formData.get("theoImage") as string) || "theo2.jpg";

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert the file to base64
    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const base64Image = `data:${image.type};base64,${base64}`;

    // Read and convert the target image to base64
    const theoImagePath = path.join(process.cwd(), "public", theoImage);
    const theoImageBuffer = fs.readFileSync(theoImagePath);
    const theoBase64 = Buffer.from(theoImageBuffer).toString("base64");
    const theoBase64Image = `data:image/jpeg;base64,${theoBase64}`;

    // Set up the input for the Replicate API
    const input = {
      swap_image: base64Image,
      hair_source: "target",
      user_gender: "default",
      target_image: theoBase64Image,
      user_b_gender: "default",
    };

    // Call the Replicate face swap API
    const output = await replicate.run("easel/advanced-face-swap", { input });

    // Extract the result URL from the response
    // Handle different response formats
    let imageUrl: string;
    if (typeof output === "object" && output !== null) {
      // Check if it's a FileOutput object with a url method
      if (typeof (output as any).url === "function") {
        imageUrl = (output as any).url();
      } else if (Array.isArray(output)) {
        // If it's an array, take the first item
        imageUrl = output[0] as string;
      } else {
        // Fallback for other formats
        imageUrl = String(output);
      }
    } else {
      // Direct string output
      imageUrl = String(output);
    }

    // Create the response
    const response = NextResponse.json({ imageUrl });

    // Send the email in the background without waiting for the response
    triggerEmailNotification(imageUrl);

    // Return the response
    return response;
  } catch (error) {
    console.error("Face swap API error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}

// Helper function to trigger the email notification in the background
async function triggerEmailNotification(imageUrl: string) {
  try {
    // Call the email endpoint
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    }).catch((error) => {
      console.error("Failed to trigger email notification:", error);
    });
  } catch (error) {
    console.error("Failed to trigger email notification:", error);
  }
}
