import React, { useState } from 'react';

function VideoUploadForm({ onSubmit }) {
  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [text, setText] = useState("");

  const handleVideoChange = (e) => setVideoFile(e.target.files[0]);
  const handleImageChange = (e) => setImageFiles(e.target.files);
  const handleTextChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ videoFile, imageFiles, text });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to be read aloud"
        />
        <button type="submit">Create Video</button>
      </form>
    </div>
  );
}

export default VideoUploadForm;
