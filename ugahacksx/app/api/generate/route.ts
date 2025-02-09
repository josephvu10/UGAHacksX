import { NextRequest } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text_prompts: [
                    {
                      text: prompt,
                    },
                  ],
                  cfg_scale: 7,
                  height: 1344,
                  width: 768,
                  steps: 30,
                  samples: 1,
            }),
        });
        console.log(response);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Failed to generate image" }), { status: 500 });
        }

        // Convert response to Buffer
        const data = await response.json();
        const base64Image = data.artifacts[0].base64; // Assuming Stability AI returns `{ "image": "base64string==" }`

        // Convert Base64 to Buffer
        const imageBuffer = Buffer.from(base64Image, "base64");

        // Return image as a binary response
        return new Response(JSON.stringify({ image: base64Image }), { status: 200 });

        // return new Response(Buffer.from(imageBuffer), {
        //     headers: {
        //         "Content-Type": "image/png",
        //         "Content-Disposition": `inline; filename="generated.png"`,
        //     },
        // });

    } catch (error) {
        console.error("Error generating image:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
