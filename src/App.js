import React, { useState } from "react";
import "./App.css";
import TexttoSpeech from "./TexttoSpeech";
import VideoUploader from "./VideoUploader";
import VideoCreator from "./VideoCreator";
import VideoDownload from "./VideoDownload";
import ShortsVideoEdit from "./ShortsVideoEdit";

const App = () => {
  const [activePage, setActivePage] = useState("textToSpeech"); // Varsayılan sayfa: videoDownload

  // Aktif sayfayı değiştiren fonksiyon
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // Sayfalar alt alta sıralanacak
        width: "100vw",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f0f0f0", // Genel arka plan rengi
        boxSizing: "border-box", // Padding'in genişlik ve yükseklik üzerinde etkisi olmasın
        overflow: "scroll",
      }}
    >
      {/* Sayfalar arası geçiş butonları */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <button
          onClick={() => handlePageChange("textToSpeech")}
          style={buttonStyle}
        >
          Videodan Shorts Hazırlama
        </button>
        {/* <button
          onClick={() => handlePageChange("videoUploader")}
          style={buttonStyle}
        >
          Video Uploader
        </button>
        <button
          onClick={() => handlePageChange("videoCreator")}
          style={buttonStyle}
        >
          Video Creator
        </button>
        <button
          onClick={() => handlePageChange("videoDownload")}
          style={buttonStyle}
        >
          Video Download
        </button> */}
      </div>

      {/* Aktif sayfayı render et */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row", // Bileşenleri yan yana yerleştirir
          gap: "2rem", // Bileşenler arasındaki boşluk
          flexWrap: "wrap", // Ekran küçüldüğünde bileşenlerin alt satıra geçmesi için
          width: "100%",
        }}
      >
        {activePage === "textToSpeech" && (
          <div style={pageContainerStyle}>
            {/* <TexttoSpeech /> */}
            <ShortsVideoEdit />
          </div>
        )}

        {/* {activePage === "videoUploader" && (
          <div style={pageContainerStyle}>
            <VideoUploader />
          </div>
        )} */}

        {/* {activePage === "videoCreator" && (
          <div style={pageContainerStyle}>
            <VideoCreator />
          </div>
        )} */}

        {/* {activePage === "videoDownload" && (
          <div style={pageContainerStyle}>
            <VideoDownload />
          </div>
        )} */}
      </div>
    </div>
  );
};

// Stil ve düzen için nesneler
const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const pageContainerStyle = {
  width: "750px", // Sabit genişlik
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "400px", // Sayfa içeriği yeterli olmasa da min yükseklik
  overflowY: "auto", // İçerik uzun olursa kaydırma çubuğu
};

export default App;
