"use client";
import React, { useState } from "react";
import styles from "./khoaTest.module.css";

export default function khoaTest() {
  const [inputValue, setInputValue] = useState("");
  const [songTitles, setSongTitles] = useState<string[]>([]); // Array to store song titles

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
        if (data.songTitles) {
          setSongTitles(data.songTitles); // Update song titles array
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Generate Song Titles</h1>
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

      {/* Display the generated song titles */}
      <div className={styles.responseContainer}>
        {songTitles.length > 0 && (
          <ul className={styles.songList}>
            {songTitles.map((title, index) => (
              <li key={index} className={styles.songItem}>
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}