import dotenv from "dotenv";
import { PinataSDK } from "pinata-web3";
import FormData from "form-data";
import fetch from "node-fetch"; 
dotenv.config();

const pinata = new PinataSDK({
    pinataJwt:  process.env.PINATA_JWT,
    pinataGateway: "ugahacksx.mypinata.cloud",
  });

export async function POST(req: Request) {
    try {
      const { text } = await req.json();
        
      if (!text) {
        return new Response(JSON.stringify({ error: "Text is required" }), { status: 400 });
      }
      const payload1 = {
        prompt: {
            text: "20 seconds " + text,
        },
      };
      const createAPI = "https://public-api.beatoven.ai/api/v1/tracks";
      const apiKey = process.env.BEATOVEN_API_KEY;
      const soundResponse = await fetch(createAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload1),
      });
  
      const data1 = await soundResponse.json();
      if (!soundResponse.ok) {
        throw new Error("Song Creation Failed");
      }
      const composeAPI = `https://public-api.beatoven.ai/api/v1/tracks/compose/${data1.tracks[0]}`;
      const payload2 = {
        "format": "wav",
        "looping": false
      };
      const composeResponse = await fetch(composeAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload2),
      });
      const data2 = await composeResponse.json();
      if (!composeResponse.ok) {
        throw new Error("Song Composition Failed");
      };
      const getComposeAPI = `https://public-api.beatoven.ai/api/v1/tasks/${data2.task_id}`;
      const finalSong = await fetch(getComposeAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      });
      let finaldata= await finalSong.json();
        if (!finalSong.ok) {
            throw new Error("Final Song Creation Failed");
        }
        while (finaldata.status != "composed") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const finalSong = await fetch(getComposeAPI, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${apiKey}`,
                },
              });
              finaldata = await finalSong.json();
        }
        console.log(finaldata)
        const songResponse = await fetch(finaldata.meta.track_url);
        if (!songResponse.ok) {
            throw new Error("Failed to download the song");
        }
        const songArrayBuffer = await songResponse.arrayBuffer();
        const songBuffer = Buffer.from(songArrayBuffer);
        const formData = new FormData();
        formData.append("file", songBuffer, {
          filename: "song.wav",
          contentType: "audio/wav",
        });
        const pinataUploadResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
              "pinata_api_key": process.env.PINATA_API_KEY!,
              "pinata_secret_api_key": process.env.PINATA_SECRET_API_KEY!,
            },
            body: formData,
          });
          const pinataData = await pinataUploadResponse.json();
          if (!pinataUploadResponse.ok) {
            throw new Error("Failed to upload to Pinata");
          }
      //return new Response(JSON.stringify(finaldata), { status: 200 });
      return new Response(JSON.stringify({ prompt: text }), { status: 200 });
    } catch (error) {
        console.log(error);
      return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
    }
  }
  