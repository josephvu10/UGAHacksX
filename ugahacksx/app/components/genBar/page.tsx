import React from "react";
import "./genBar.module.css";

const GenBar = () => {
  return (
    <div className="gen-container">
      <input type="text" placeholder="Generate sounds..." />
      <button type="submit">Submit</button>
    </div>
  );
};


export default GenBar;