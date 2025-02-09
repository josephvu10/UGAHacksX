"use client";
import styles from "./genBar.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useEffect } from "react";

const GenBar = () => {
  const [inputValue, setInputValue] = useState(""); // Input field state
  const [songTitles, setSongTitles] = useState<string[]>([]);
  const [genre, setGenre] = useState<string | null>(null);
  const { user } = useUser();
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [visibility, setVisibility] = useState("private"); // Default: private

  // Handles changes in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle checkbox toggle
  const handleToggleChange = () => {
    setVisibility((prev) => (prev === "private" ? "public" : "private"));
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
      visibility, // Updated to reflect checkbox state
    };

    console.log("Submitting:", requestBody);

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

  // Fetch user data from Auth0 when available
  useEffect(() => {
    if (user) {
      setUserId(user.sub ?? "");
      setNickname(user.nickname ?? "");
    }
  }, [user]);

  return (
    <div className={styles.genContainer}>
      <input
        type="text"
        placeholder="Generate sounds..."
        value={inputValue}
        onChange={handleChange}
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Submit
      </button>

      {/* Public/Private Toggle */}
      <label className={styles.toggleSwitch}>
        <input type="checkbox" checked={visibility === "private"} onChange={handleToggleChange} />
      </label>
    </div>
  );
};

export default GenBar;