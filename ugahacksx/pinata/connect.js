import { PinataSDK } from "pinata-web3";
import dotenv from "dotenv";
dotenv.config();
const pinata = new PinataSDK({
  pinataJwt:  process.env.PINATA_JWT,
  pinataGateway: "ugahacksx.mypinata.cloud",
});

async function main() {
    console.log(process.env.PINATA_JWT);
    try {
      const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
      const upload = await pinata.upload.file(file);
      console.log(upload);
    } catch (error) {
      console.log(error);
    }
  }
  
await main();

