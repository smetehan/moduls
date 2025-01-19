import React, { useState, useEffect } from 'react';

function VideoWithSlideshow({ videoFile, imageFiles }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageInterval, setImageInterval] = useState(null);

  useEffect(() => {
    if (imageFiles.length > 0) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % imageFiles.length);
      }, 2000); // Resim geçiş süresi: 2 saniye
      setImageInterval(interval);

      return () => clearInterval(interval);
    }
  }, [imageFiles]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <video src={URL.createObjectURL(videoFile)} autoPlay loop style={{ width: '100%', height: '50%' }} />
      <div style={{ position: 'relative', width: '100%', height: '50%', overflow: 'hidden' }}>
        {imageFiles.length > 0 && (
          <img
            src={URL.createObjectURL(imageFiles[currentImage])}
            alt="Slideshow"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 1s ease-in-out',
              opacity: 1,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default VideoWithSlideshow;
