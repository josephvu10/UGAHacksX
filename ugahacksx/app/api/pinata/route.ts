import dotenv from "dotenv";
import { PinataSDK } from "pinata-web3";
import FormData from "form-data";
import fetch from "node-fetch"; 
import { NextRequest } from "next/server";
dotenv.config();

const pinata = new PinataSDK({
    pinataJwt:  process.env.PINATA_JWT,
    pinataGateway: "ugahacksx.mypinata.cloud",
  });

export async function POST(req: Request) {
    try {
      const { text, sub, nickname, visibility } = await req.json();
        
      if (!text) {
        return new Response(JSON.stringify({ error: "Text is required" }), { status: 400 });
      }
      const payload1 = {
        prompt: {
            text: "20 seconds of " + text,
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
            await new Promise((resolve) => setTimeout(resolve, 2500));
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

      // Add the CID to a Pinata group
      const group = await pinata.groups.addCids({
        groupId: "8cc7514a-f9fd-40ce-a64f-1270d3af32d9",
        cids: [pinataData.IpfsHash],
    });
        if (!group) {
            throw new Error("Failed to add to group");
        }
      
        // Get generated title and genre
        const geminiResponse = await fetch("http://localhost:3000/api/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });

        if (!geminiResponse.ok) {
            throw new Error("Failed to get song titles from Gemini API");
        }

        const { songTitles, genre } = await geminiResponse.json();

        console.log("🎵 Song Titles:", songTitles);
        console.log("🎼 Genre:", genre);

        // Get generated image
        const imageResponse = await fetch("http://localhost:3000/api/generate", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: text }),
        });
        const imageData = await imageResponse.json();
        if (!imageResponse.ok) {
            throw new Error("Failed to get image from Gemini API");
        }
        console.log("Printing Image Data");

        // Uploading to Pinata

          const file = new File([imageData.image], "image.txt", { type: "text/plain" });
          const upload = await pinata.upload.file(file);
          console.log("Uploading Image to Pinata");
          const group2 = await pinata.groups.addCids({
            groupId: "f44d84bb-23fd-43e1-9d14-83ab2c0b6675",
            cids: [upload.IpfsHash],
          });
            if (!group2) {
                throw new Error("Failed to add to group");
            }
            const songObject = {
              authorName : nickname,
              title: songTitles[0],
              genre: genre,
              image: upload.IpfsHash,
              audio: pinataData.IpfsHash,
              prompt: text,
              visibility : visibility
            }
            const upload2 = await pinata.upload.json(songObject);
            console.log("Uploading song to Pinata");
            const group3 = await pinata.groups.addCids({
              groupId: "7a97dd88-d4dd-42bc-bd51-a04e608d270e",
              cids: [upload2.IpfsHash],
            });
              if (!group3) {
                  throw new Error("Failed to add to group");
              }
              const file2 = new File([upload2.IpfsHash], `${sub}`, { type: "text/plain" });
              console.log("Uploading user to pinata");
              const upload3 = await pinata.upload.file(file2);
              if (!upload3) {
                  throw new Error("Failed to upload to Pinata");
              }
              const group4 = await pinata.groups.addCids({
                groupId: "c180c535-2513-4105-94e5-3af532ff51ac",
                cids: [upload3.IpfsHash],
              });
                if (!group4) {
                    throw new Error("Failed to add to group");
                }
                return new Response(JSON.stringify({ prompt: text }), { status: 200 });
        } catch (error) {
          return new Response(JSON.stringify({ error: error }), { status: 500 });
        }
        
    } 
 
  
  
  const pinataGateway = "https://ugahacksx.mypinata.cloud/ipfs/";
  
  export async function GET(req : NextRequest) {
    try {
      //   const { searchParams } = new URL(req.url);
      //   const ipfsHash = searchParams.get("cid");
      // if (!ipfsHash) {
      //   throw new Error("Failed to fetch file from Pinata");
      // }// 🎯 STEP 1: Fetch List of All Files from Pinata API

      const pinataListResponse = await fetch("https://api.pinata.cloud/data/pinList", {
            method: "GET",
              headers: {
                "pinata_api_key": process.env.PINATA_API_KEY!,
                "pinata_secret_api_key": process.env.PINATA_SECRET_API_KEY!,
              
            },
        });
        if (!pinataListResponse.ok) {
            throw new Error("Failed to fetch file list from Pinata");
        }
        console.log("Here")

        const pinataList = await pinataListResponse.json();

        if (!pinataList.rows.length) {
            return new Response(JSON.stringify({ message: "No JSON files found" }), { status: 404 });
        }

        console.log(`✅ Found ${pinataList.rows.length} total files`);

        // 🎯 STEP 2: Filter Only JSON Files (Based on File Name or Metadata)
        console.log(pinataList.rows)
        const jsonFiles = pinataList.rows.filter((file) => file.mime_type === "application/json");

        if (jsonFiles.length === 0) {
            return new Response(JSON.stringify({ message: "No JSON files found" }), { status: 404 });
        }

        console.log(`📂 Fetching ${jsonFiles.length} JSON files...`);

        // 🎯 STEP 3: Fetch Each JSON File's Content from Pinata
        const jsonDataArray = await Promise.all(
            jsonFiles.map(async (file) => {
                await new Promise((resolve) => setTimeout(resolve, 500)); // ✅ Add a delay to avoid rate limits
                const cid = file.ipfs_pin_hash;
                console.log(`${pinataGateway}${cid}`)
                const response = await fetch(`${pinataGateway}${cid}`);

                if (!response.ok) {
                    console.error(`❌ Failed to fetch JSON file: ${cid}`);
                    return null;
                }

                const jsonData = await response.json();
                return { data: jsonData };
            })
        );

        // 🎯 STEP 4: Filter Out Any Failed Fetches
        const validJsonFiles = jsonDataArray.filter((file) => file !== null);

        console.log(`✅ Successfully fetched ${validJsonFiles.length} JSON files`);

        // 🎯 STEP 5: Fetch Image & Audio for Each Author
        const structuredData = await Promise.all(
          validJsonFiles.map(async ({ data }) => {
              try {
                  const { authorName, title, genre, image, audio, prompt, visibility } = data;

                  console.log(`🔄 Fetching media for: ${authorName}`);

                  // Fetch image
                  const imageUrl = `${pinataGateway}${image}`;
                  const imageResponse = await fetch(imageUrl);
                  if (!imageResponse.ok) throw new Error(`Failed to fetch image: ${image}`);
                  const base64Image = await imageResponse.text(); 
                  // Fetch audio
                  const audioUrl = `${pinataGateway}${audio}`;
                  const audioResponse = await fetch(audioUrl);
                  const audioArrayBuffer = await audioResponse.arrayBuffer();
                  const audioBlob = new Blob([audioArrayBuffer], { type: "audio/wav" });
                  const audioBlobUrl = URL.createObjectURL(audioBlob); // ✅ Converts audio into a local Blob URL
            
                  if (!audioResponse.ok) throw new Error(`Failed to fetch audio: ${audio}`);
                  return {
                      authorName,
                      title,
                      genre,
                      image: `data:image/png;base64,${base64Image}`, // ✅ Convert Base64 to Image URL
                      audio: audioUrl, // ✅ Use a Blob URL for the Audio
                      prompt,
                      visibility,

                  };
              } catch (err) {
                  console.error(`❌ Error processing:`, err);
                  return null;
              }
          })
      );

      // 🎯 STEP 6: Return the Final Structured Data
      const filteredResults = structuredData.filter((entry) => entry !== null);
      return new Response(JSON.stringify(filteredResults), { status: 200 });
     
    } catch (error) {
      return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
  }