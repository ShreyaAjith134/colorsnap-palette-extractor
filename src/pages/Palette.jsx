import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { extractColors } from "extract-colors";
import "./Palette.css";

const Palette = () => {
  const location = useLocation();
  const { imageUrl, fileName } = location.state || {};
  const [colors, setColors] = useState([]);
  const [paletteName, setPaletteName] = useState("");
  const [note, setNote] = useState("");
  const imgRef = useRef(null);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      img.onload = async () => {
        try {
          const extracted = await extractColors(img.src, {
            pixels: 2048,
            distance: 0.2,
          });

          // ✅ Always return exactly 5 colors
          let topFive = extracted
            .sort((a, b) => b.area - a.area)
            .slice(0, 5);

          // Fill remaining with placeholder grays if fewer than 5
          while (topFive.length < 5) {
            topFive.push({ hex: "#CCCCCC" });
          }

          setColors(topFive);
        } catch (err) {
          console.error("Error extracting colors:", err);
        }
      };
    }
  }, [imageUrl]);

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("❌ Please log in to save palettes!");
      return; // ⛔ stop saving
    }

    if (!paletteName.trim()) {
      alert("Please enter a palette name before saving.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/palettes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId, // ✔ attach logged-in user id
          name: paletteName,
          note,
          colors: colors.map((c) => c.hex),
        }),
      });

      if (response.ok) {
        alert("🎨 Palette saved successfully!");
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
    <div className="palette">
      <Header />
      <h1>Extracted Color Palette</h1>

      <div className="palette-content">
        {/* Left section — Image + Color Grid */}
        <div className="image-section">
          {imageUrl ? (
            <>
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Uploaded"
                className="uploaded-image"
              />

              {/* 🎨 Exactly 5 Colors Below Image */}
              {colors.length > 0 && (
                <div className="color-grid">
                  {colors.map((color, i) => {
                    const r = parseInt(color.hex.slice(1, 3), 16);
                    const g = parseInt(color.hex.slice(3, 5), 16);
                    const b = parseInt(color.hex.slice(5, 7), 16);
                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                    const textColor = brightness > 128 ? "#000" : "#fff";

                    return (
                      <div
                        key={i}
                        className="color-box"
                        style={{ backgroundColor: color.hex, color: textColor }}
                      >
                        <span>{color.hex}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <p>No image found. Please go back and upload an image.</p>
          )}
        </div>

        {/* Right section — Inputs & Save */}
        <div className="colors-section">
          <div className="input-group">
            <h2>Palette Name</h2>
            <input
              type="text"
              placeholder="Enter palette name"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              className="input-box"
            />
          </div>

          <div className="input-group">
            <h2>Note (Optional)</h2>
            <input
              type="text"
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-box"
            />
          </div>

          <div className="save-button-container">
            <button className="save-btn" onClick={handleSave}>
              Save Palette
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Palette;
