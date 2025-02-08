"use client";

import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Files from "../components/Files";
import styles from "./exampleUsage.module.css";

export default function exampleUsage() {
    const [file, setFile] = useState("");
    const [cid, setCid] = useState("");
    const [uploading, setUploading] = useState(false);

    const inputFile: any = useRef(null);

    const uploadFile = async (fileToUpload: any) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", fileToUpload, `${fileToUpload.name}`);
            const request = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });
            const response = await request.json();
            console.log(response);
            setCid(response.IpfsHash);
            setUploading(false);
        } catch (e) {
            console.log(e);
            setUploading(false);
            alert("Trouble uploading file");
        }
    };

    const handleChange = (e: any) => {
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0]);
    };

    const loadRecent = async () => {
        try {
            const res = await fetch("/api/files");
            const json = await res.json();
            setCid(json.ipfs_pin_hash);
        } catch (e) {
            console.log(e);
            alert("trouble loading files");
        }
    };

    return (
        <>
            <main className={styles.main}>
                <div className={styles.heroBackground}>
                    <div className={styles.container}>
                        <div className={styles.hero}>
                            <div className={styles.copy}>
                                <h1>Pinata + Next.js</h1>
                                <p>
                                    Update the <span className={styles.code}>.env.local</span> file to
                                    set your Pinata API key and (optionally) your IPFS gateway
                                    URL, restart the app, then click the Upload button and you'll
                                    see uploads to IPFS just work™️. If you've already uploaded
                                    files, click Load recent to see the most recently uploaded
                                    file.
                                </p>
                                <input
                                    type="file"
                                    id="file"
                                    ref={inputFile}
                                    onChange={handleChange}
                                    style={{ display: "none" }}
                                />
                                <div className={styles.flexBtns}>
                                    <button onClick={loadRecent} className={styles.btnLight}>
                                        Load recent
                                    </button>
                                    <button
                                        disabled={uploading}
                                        onClick={() => inputFile.current.click()}
                                        className={styles.btn}
                                    >
                                        {uploading ? "Uploading..." : "Upload"}
                                    </button>
                                </div>
                                {cid && (
                                    <div className={styles.fileList}>
                                        <Files cid={cid} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}