"use client";
import React, { useState } from "react";
import styles from "./khoaTest.module.css";

export default function KhoaTest() {
  const [inputValue, setInputValue] = useState("");
  const [songTitles, setSongTitles] = useState<string[]>([]); // Store song titles
  const [genre, setGenre] = useState<string | null>(null); // Store genre

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const requestBody = {
      text: inputValue,
    };

    // Uncomment and replace with actual endpoint or functionality if needed
    /*
    fetch('/api/pinata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */

    // Fetch response from Gemini API
    fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.songTitles && data.genre) {
          setSongTitles(data.songTitles);
          setGenre(data.genre);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
    <div className={styles.titleContainer}>
      <h1>Generate Song Titles & Genre</h1>
    </div>
    <div className={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a theme or idea"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.genbutton}>
        Generate
      </button>

      </div>
      
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