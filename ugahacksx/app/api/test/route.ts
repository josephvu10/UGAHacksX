import dotenv from "dotenv";
import { PinataSDK } from "pinata-web3";
import FormData from "form-data";
import fetch from "node-fetch";
import { NextRequest } from "next/server";
dotenv.config();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: "ugahacksx.mypinata.cloud",
});

export const pinataGateway = "https://ugahacksx.mypinata.cloud/ipfs/";

export async function GET(req: NextRequest) {
  try {
    //   const { searchParams } = new URL(req.url);
    //   const ipfsHash = searchParams.get("cid");
    // if (!ipfsHash) {
    //   throw new Error("Failed to fetch file from Pinata");
    // }// 🎯 STEP 1: Fetch List of All Files from Pinata API

    const pinataListResponse = await fetch("https://api.pinata.cloud/data/pinList?pageLimit=100", {
      method: "GET",
      headers: {
        "pinata_api_key": process.env.PINATA_API_KEY!,
        "pinata_secret_api_key": process.env.PINATA_SECRET_API_KEY!,

      },
    });
    if (!pinataListResponse.ok) {
      throw new Error("Failed to fetch file list from Pinata");
    }
    const pinataList = await pinataListResponse.json();

    if (!pinataList.rows.length) {
      return new Response(JSON.stringify({ message: "No JSON files found" }), { status: 404 });
    }

    console.log(`✅ Found ${pinataList.rows.length} total files`);

    // 🎯 STEP 2: Filter Only JSON Files (Based on File Name or Metadata)
    console.log(pinataList)
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
    
    return new Response(JSON.stringify({test : "success"}), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}