"use client";
import React, { useState } from 'react';
import styles from './khoaTest.module.css';

export default function khoaTest() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const requestBody = {
      text: inputValue,
    };

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
  };

  return (
    <div className={styles.container}>
      <h1>Test</h1>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Enter text here" 
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>Send</button>
    </div>
  );
}