import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is correctly loaded
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text input is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Strict prompt to ensure output is ONLY song titles
    const prompt = `Generate exactly 2 or 3 unique and creative song titles based on the following theme: "${text}". 
    - Do NOT include any explanation or extra text. 
    - Only output the song titles, each on a new line.`;

    const result = await model.generateContent(prompt);

    // Extract the AI-generated response and split it into individual song titles
    const aiText = result.response.text();
    const songTitles = aiText.split("\n").filter((line) => line.trim() !== ""); // Removes empty lines

    return NextResponse.json({ songTitles });
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Failed to generate response from Gemini API" },
      { status: 500 }
    );
  }
}