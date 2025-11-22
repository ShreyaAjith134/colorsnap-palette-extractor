//Upload.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Upload.css";
import file from "../assets/file.png";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        console.log('File selected:', file);
      } else {
        alert('Please upload an image file (JPG, PNG, GIF, etc.)');
      }
    }
  };

  const handleGetPalette = () => {
    if (selectedFile) {
      // Convert file to URL and navigate
      const imageUrl = URL.createObjectURL(selectedFile);
      navigate('/palette', { 
        state: { 
          imageUrl: imageUrl,
          fileName: selectedFile.name 
        } 
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="upload">
      <Header />
      <h1>Color Palette Extractor</h1>
      
      <div className="upload-content">
        {selectedFile ? (
          <div className="file-info">
            <p><strong>{selectedFile.name}</strong></p>
            <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button 
                className="btn primary"
                onClick={handleGetPalette}
              >
                Get Palette
              </button>
              <button 
                className="btn"
                onClick={handleRemoveFile}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-section">
            <div className="title-with-icon">
              <img src={file} alt="File" className="file-icon" />
              <h2>Upload your image</h2>
            </div>
            <button 
              className="btn primary"
              onClick={() => document.getElementById('file-input').click()}
            >
              Choose File
            </button>
            <p className="supported-formats">Supports: JPG, PNG, GIF, WEBP</p>
          </div>
        )}
      </div>
      
      <input 
        id="file-input"
        type="file" 
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default Upload;