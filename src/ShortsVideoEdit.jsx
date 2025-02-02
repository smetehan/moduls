import React, { useState } from "react";
import axios from "axios";

const ShortsVideoEdit = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [txtFile, setTxtFile] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [downloadingIndex, setDownloadingIndex] = useState(null); // Hangi videonun indirildiği bilgisini tutar

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
          "https://22a6-95-15-219-157.ngrok-free.app/split",
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
    console.log(url, "url");
    setDownloadingIndex(index); // Hangi videonun indirileceğini belirtiyoruz
    setLoading(true);

    try {
      // Ngrok uyarısını geçmek için gerekli başlıklar
      const headers = {
        "ngrok-skip-browser-warning": "true", // Ngrok uyarısını atla
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", // Tarayıcı User-Agent'ı
      };

      // Dosyayı blob formatında indiriyoruz
      const response = await axios.get(url, {
        responseType: "blob",
        headers: headers, // Başlıkları ekliyoruz
      });

      const blob = response.data;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `output_${index + 1}.mp4`; // İndirilen dosya adı
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setMessage("Dosya indirme hatası!");
    }
    setLoading(false);
    setDownloadingIndex(null); // İndirme işlemi bittiğinde `downloadingIndex` sıfırlanır
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
              <button
                onClick={() => downloadFile(link, index)}
                disabled={downloadingIndex === index || loading} // İndirme işlemi yapılırken butonları devre dışı bırakıyoruz
              >
                {downloadingIndex === index
                  ? "Video İndiriliyor..."
                  : `Video ${index + 1} İndir`}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShortsVideoEdit;
