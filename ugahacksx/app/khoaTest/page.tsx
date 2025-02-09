"use client";
import React, { useState, useEffect } from "react";
import styles from "./khoaTest.module.css";
import NavBar from "../components/NavBar/page"; // Import the NavBar component
import ProgressBar from "../components/progressBar/ProgessBar";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function khoaTest() {
  const [inputValue, setInputValue] = useState("");
  const [songTitles, setSongTitles] = useState<string[]>([]); // Store song titles
  const [genre, setGenre] = useState<string | null>(null); // Store genre
  const { user } = useUser(); // Get user data from Auth0
  const [currentStep, setCurrentStep] = useState("Starting...");


  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState(""); // Store "nickname"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) {
      console.error("Error: No text input provided.");
      return;
    }
  
    const requestBody = {
      text: inputValue,
      sub: user ? user.sub : null,
      nickname: user ? user.nickname : null,
      visibility: "public",
    };
  
        // Make a POST request to the API
        fetch("/api/pinata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
          
      };
    
  // useEffect(() => {
  //   // Fetch user data from Auth0
  //   if (user) {
  //     setUserId(user.sub ?? "");
  //     setNickname(user.nickname ?? "");
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await fetch("/api/pinata"); // Replace with your actual API route
        const data = await response.json();
        setCurrentStep(data.step);
      } catch (error) {
        console.error("Error fetching step:", error);
      }
    };

    // ✅ Poll every 2 seconds to get the latest step
    const interval = setInterval(fetchStep, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={styles.container}>
      <NavBar />
      <h1>Generate Song Titles & Genre</h1>
      <div>
       <h2>Current Step:</h2>
        <p>{currentStep}</p>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a theme or idea"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Generate
      </button>
      {/* Display the generated song titles and genre */}
      <div className={styles.responseContainer}>
        {songTitles.length > 0 && (
          <>
            <h2>Song Titles</h2>
            <ul className={styles.songList}>
              {songTitles.map((title, index) => (
                <li key={index} className={styles.songItem}>
                  {title}
                </li>
              ))}
            </ul>
          </>
        )}

        {genre && (
          <>
            <h2>Most Fitting Genre</h2>
            <p className={styles.genre}>{genre}</p>
          </>
        )}
      </div>
    </div>
  );
}