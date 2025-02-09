"use client";
import styles from "./genBar.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useEffect, ChangeEvent } from "react";

const GenBar = () => {
  const [inputValue, setInputValue] = useState("");
  const { user } = useUser();
  const [visibility, setVisibility] = useState("private");
  const [switchState, setSwitchState] = useState(false);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSwitchState(e.target.checked);
    setVisibility(e.target.checked ? "public" : "private");
  }

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
      visibility,
    };

    console.log("Submitting:", requestBody);

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
      <div className={styles.toggleContainer}>
        <span className={styles.toggleLabel}>Public?</span>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={switchState}
            onChange={handleOnChange}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default GenBar;