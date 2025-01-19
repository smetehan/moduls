import React, { useState } from "react";
import axios from "axios";

const VideoUploader = () => {
  const [text, setText] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !video) {
      alert("Lütfen bir metin ve video seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("video", video);

    try {
      setLoading(true);
      setDownloadLink("");
      const response = await axios.post(
        "https://6c1a-88-244-208-3.ngrok-free.app/5002/create-video",
        formData,
        {
          responseType: "blob",
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // İşlenen videoyu indirmek için bağlantı oluştur
      const blob = new Blob([response.data], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (error) {
      console.error("Hata:", error);
      alert("Video oluşturulurken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Metin ve Videodan Video Oluşturucu</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>
            <strong>Metin:</strong>
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Metni buraya yazın..."
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.inputGroup}>
          <label>
            <strong>Video Dosyası:</strong>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={styles.fileInput}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={
            loading
              ? {
                  ...styles.button,
                  backgroundColor: "#ccc",
                  cursor: "not-allowed",
                }
              : styles.button
          }
        >
          {loading ? "İşleniyor..." : "Gönder"}
        </button>
      </form>

      {downloadLink && (
        <div style={styles.downloadSection}>
          <h3 style={styles.successMessage}>Video Hazır!</h3>
          <a
            href={downloadLink}
            download="shorts_vertical_video.mp4"
            style={styles.downloadButton}
          >
            Videoyu İndir
          </a>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "30px auto",
  },
  header: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  fileInput: {
    display: "block",
    marginTop: "5px",
    padding: "12px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  downloadSection: {
    marginTop: "20px",
    textAlign: "center",
  },
  successMessage: {
    fontSize: "18px",
    color: "#28a745",
    fontWeight: "600",
  },
  downloadButton: {
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
};

export default VideoUploader;
