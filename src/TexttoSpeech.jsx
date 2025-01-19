import React, { useState } from "react";
import axios from "axios";

const TexttoSpeech = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCreateVideo = async () => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("text", text);

      // Add images and video to formData
      images.forEach((image, index) => formData.append("images", image));
      if (videoFile) {
        formData.append("video", videoFile);
      }

      const response = await axios.post(
        "https://6c1a-88-244-208-3.ngrok-free.app/5001/create-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const videoUrl = URL.createObjectURL(response.data);
      setDownloadUrl(videoUrl);
    } catch (error) {
      console.error("Error creating video:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "40px auto",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Metin Resim ve Videodan Video Oluşturma
      </h1>

      <textarea
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          outline: "none",
          resize: "vertical",
        }}
        value={text}
        onChange={handleTextChange}
        placeholder="Metninizi buraya yazın..."
        rows="4"
        cols="50"
      />

      <div style={{ marginBottom: "15px", width: "100%" }}>
        <label
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            display: "block",
            marginBottom: "5px",
          }}
        >
          Resim Seçin:
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "15px", width: "100%" }}>
        <label
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            display: "block",
            marginBottom: "5px",
          }}
        >
          Video Seçin:
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </label>
      </div>

      <button
        style={{
          padding: "12px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: isProcessing ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={handleCreateVideo}
        disabled={isProcessing}
      >
        {isProcessing ? "İşleniyor..." : "Videoyu Oluştur"}
      </button>

      {downloadUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <a
            href={downloadUrl}
            download="video.mp4"
            style={{
              textDecoration: "none",
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          >
            <button
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "12px 20px",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            >
              Videoyu İndir
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default TexttoSpeech;
