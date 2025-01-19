import React, { useState } from "react";
import axios from "axios";

const VideoCreator = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !image) {
      alert("Lütfen metin ve bir resim dosyası yükleyin.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("image", image);

    setLoading(true);

    try {
      const response = await axios.post(
        "https://6c1a-88-244-208-3.ngrok-free.app/5003/create-video",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const videoUrl = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(videoUrl); // URL'yi state'e kaydet
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Video oluşturulurken bir hata meydana geldi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Metin ve Resimden Video Oluşturucu</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="text" style={styles.label}>
            Metin:
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            cols="50"
            placeholder="Videoda kullanılacak metni buraya yazın..."
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="image" style={styles.label}>
            Resim:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={styles.fileInput}
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Oluşturuluyor..." : "Videoyu Oluştur"}
        </button>
      </form>

      {/* Eğer video oluşturulduysa "İndir" butonu göster */}
      {downloadUrl && (
        <div style={styles.downloadContainer}>
          <a
            href={downloadUrl}
            download="output_video.mp4"
            style={styles.downloadLink}
          >
            <button style={styles.downloadButton}>Videoyu İndir</button>
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
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "500px",
    margin: "30px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
    marginBottom: "5px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    resize: "none",
    outline: "none",
    transition: "border 0.3s ease",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  downloadContainer: {
    marginTop: "20px",
  },
  downloadLink: {
    textDecoration: "none",
  },
  downloadButton: {
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default VideoCreator;
