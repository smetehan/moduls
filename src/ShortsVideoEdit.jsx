import React, { useState } from "react";
import axios from "axios";

const ShortsVideoEdit = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [txtFile, setTxtFile] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleSubmit = async () => {
    if (!videoFile || !txtFile) {
      setMessage("Lütfen video ve TXT dosyası seçin.");
      return;
    }

    setLoading(true); // ✅ İşlem başlarken yükleniyor aktif

    const reader = new FileReader();
    reader.onload = async (e) => {
      const txtContent = e.target.result.trim();

      const segments = txtContent.split("\n").map((line) => {
        const [start, end] = line.split(",");
        return { start: parseFloat(start), end: parseFloat(end) };
      });

      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("data", JSON.stringify(segments));

      try {
        const response = await fetch(
          " https://721f-95-15-219-157.ngrok-free.app/split",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (response.ok) {
          setMessage("Video başarıyla bölündü.");
          setDownloadLinks(data.downloadLinks);
        } else {
          setMessage(`Hata: ${data.error}`);
        }
      } catch (error) {
        setMessage("Sunucuya bağlanırken hata oluştu.");
      }

      setLoading(false); // ✅ İşlem bitince yükleniyor kapat
    };

    reader.readAsText(txtFile);
  };

  const downloadFile = async (url, index) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `video_${index + 1}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setMessage("Dosya indirme hatası!");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h2>Video Bölme Aracı</h2>
      <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
      <input
        type="file"
        accept=".txt"
        onChange={(e) => setTxtFile(e.target.files[0])}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "İşleniyor..." : "Videoyu Böl"}
      </button>

      {message && <p>{message}</p>}
      {loading && <p>Videolar işleniyor, lütfen bekleyin...</p>}

      <div>
        {downloadLinks.length > 0 && <h3>İndirilebilir Videolar:</h3>}
        {downloadLinks
          .slice() // Orijinal diziye zarar vermemek için kopyasını alıyoruz
          .reverse() // Diziyi tersine çevir
          .map((link, index) => (
            <div key={index}>
              <button onClick={() => downloadFile(link, index)}>
                Video {index + 1} İndir
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ShortsVideoEdit;
