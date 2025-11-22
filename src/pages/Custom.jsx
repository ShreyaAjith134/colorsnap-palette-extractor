// Custom.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import "./Custom.css";

const Custom = () => {
  const [colors, setColors] = useState(["#FFB6C1", "#FFD700", "#90EE90", "#ADD8E6", "#DDA0DD"]);
  const [paletteName, setPaletteName] = useState("");
  const [note, setNote] = useState("");

  const handleColorChange = (index, value) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  const handleSave = async () => {
    if (!paletteName.trim()) {
      alert("Please enter a palette name before saving.");
      return;
    }

    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch("http://localhost:5000/api/palettes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,          
          name: paletteName,
          note,
          colors,         
        }),
      });

      if (response.ok) {
        alert("🎨 Custom palette saved successfully!");
        setPaletteName("");
        setNote("");
      } else {
        alert("❌ Failed to save palette.");
      }
    } catch (error) {
      console.error("Error saving palette:", error);
      alert("❌ Error connecting to server.");
    }
  };

  return (
    <div className="custom-palette">
      <Header />
      <h1>Create Your Own Palette</h1>

      <div className="custom-palette-content">
        {/* Left section — Color Pickers */}
        <div className="custom-image-section">
          <div className="custom-color-grid">
            {colors.map((color, i) => (
              <div key={i} className="custom-color-box" style={{ backgroundColor: color }}>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(i, e.target.value)}
                  className="custom-color-picker"
                />
                <span className="custom-color-label">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right section — Inputs & Save */}
        <div className="custom-colors-section">
          <div className="custom-input-group">
            <h2>Palette Name</h2>
            <input
              type="text"
              placeholder="Enter palette name"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              className="custom-input-box"
            />
          </div>

          <div className="custom-input-group">
            <h2>Note (Optional)</h2>
            <input
              type="text"
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="custom-input-box"
            />
          </div>

          <div className="custom-save-button-container">
            <button className="custom-save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
