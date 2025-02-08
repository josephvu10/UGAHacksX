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

    // Prompt to get both song titles and the most fitting genre
    const prompt = `
      Based on the following theme: "${text}", generate:
      1. Exactly 2-3 unique and creative song titles.
      2. The most fitting genre for these songs.
      
      Format your response as follows:
      SONG TITLES:
      - [Song Title 1]
      - [Song Title 2]
      - [Song Title 3 (if applicable)]

      GENRE:
      [Genre Name]

      Do not add any explanations, only output in the given format.
    `;

    const result = await model.generateContent(prompt);

    // Extract the AI-generated response
    const aiText = result.response.text();

    // Parse the response to separate song titles and genre
    const lines = aiText.split("\n").map((line) => line.trim()); // Trim spaces and split by line
    const songTitles: string[] = [];
    let genre = "";

    let parsingTitles = false;
    let parsingGenre = false;

    for (const line of lines) {
      if (line.startsWith("SONG TITLES:")) {
        parsingTitles = true;
        parsingGenre = false;
        continue;
      } else if (line.startsWith("GENRE:")) {
        parsingGenre = true;
        parsingTitles = false;
        continue;
      }

      if (parsingTitles && line.startsWith("- ")) {
        songTitles.push(line.replace("- ", "").trim()); // Remove "- " from the title
      } else if (parsingGenre && line.length > 0) {
        genre = line; // The first non-empty line under GENRE is the genre
        break;
      }
    }

    return NextResponse.json({ songTitles, genre });
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Failed to generate response from Gemini API" },
      { status: 500 }
    );
  }
}