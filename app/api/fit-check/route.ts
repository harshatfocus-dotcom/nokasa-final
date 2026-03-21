import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Groq API Key not configured. Please build with correct environment variables." },
      { status: 500 }
    );
  }

  const groq = new Groq({ apiKey });

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const occasion = formData.get("occasion") as string;
    const style = formData.get("style") as string;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert file to base64 for Groq Vision
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const promptBody = `Analyze the provided image of an outfit. 
    Context: Occasion is "${occasion}", Style is "${style}".
    
    Respond STRICTLY in JSON:
    - score: (0-100)
    - verdict: (2-3 sophisticated sentences)
    - changes: (list of 2-3 specific improvements)
    
    Format: {"score": 85, "verdict": "...", "changes": ["...", "..."]}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.2-11b-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: promptBody },
            {
              type: "image_url",
              image_url: {
                url: `data:${image.type};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0].message.content;
    if (!text) throw new Error("Empty response from AI");

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Groq FitCheck Error Details:", {
      message: error.message,
      name: error.name,
      status: error.status,
    });
    
    let errorMessage = "Failed to analyze the fit via Groq. Please check your API key and image.";
    if (error.status === 401) errorMessage = "Invalid Groq API Key.";
    if (error.status === 429) errorMessage = "Groq Rate Limit exceeded.";

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: error.status || 500 }
    );
  }
}
