import React, { useState } from "react";
import axios from "axios";

const VideoDownload = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleDownload = async () => {
    if (!url) {
      setStatus("Lütfen bir YouTube URL'si girin!");
      return;
    }

    setStatus("İndiriliyor...");
    try {
      const response = await axios.post(
        " https://6c1a-88-244-208-3.ngrok-free.app/5004/download",
        { url },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "video.mp4";
      link.click();

      setStatus("İndirme tamamlandı!");
    } catch (error) {
      console.error(error);
      setStatus("Video indirilemedi!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        placeholder="YouTube URL'sini girin"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ maxwidth: "250px", padding: "10px", margin: "10px" }}
      />
      <button
        onClick={handleDownload}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        İndir
      </button>
      <p>{status}</p>
    </div>
  );
};
export default VideoDownload;
