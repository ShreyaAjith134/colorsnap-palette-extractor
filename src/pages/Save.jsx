import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Save.css";

const Save = () => {
  const [palettes, setPalettes] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) fetchPalettes(userId);
  }, []);

  const fetchPalettes = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/palettes/${userId}`);
      const data = await res.json();
      setPalettes(data);
    } catch (error) {
      console.error("Error fetching palettes:", error);
    }
  };

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1000);
  };

  return (
    <div className="saved-page">
      <Header />

      <div className="saved-content">
        <p className="saved-title">Saved Palettes</p>

        <div className="saved-container">
          <div className="saved-grid">

            {palettes.length > 0 ? (
              palettes.map((palette) => (
                <div key={palette._id} className="saved-card">

                  <h2 className="saved-name">{palette.name}</h2>

                  <div className="saved-colors-row">
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="saved-color"
                        style={{ backgroundColor: color }}
                        onClick={() => copyColor(color)}
                      ></div>
                    ))}
                  </div>

                  {palette.note && <p className="saved-note">{palette.note}</p>}

                </div>
              ))
            ) : (
              <p className="no-saved">No saved palettes yet 😢</p>
            )}

          </div>
        </div>

        {copiedColor && <div className="copy-popup">Copied {copiedColor} 🎉</div>}
      </div>
    </div>
  );
};

export default Save;
