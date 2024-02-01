import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subtitle, setSubtitle] = useState("Chapter 1");

  useEffect(() => {
    let mounted = true;
    let imgList = [];

    const loadImages = async () => {
      let index = 1;

      while (mounted) {
        const imagePath = `${process.env.PUBLIC_URL}/assets/${index}.png`;

        try {
          const response = await fetch(imagePath);

          // Check if response is an image type
          const contentType = response.headers.get("Content-Type");
          if (!response.ok || !contentType || !contentType.startsWith("image")) {
            // If it's not an image or response not OK, break the loop
            break;
          } else {
            imgList.push(imagePath);
            index++;
          }
        } catch (error) {
          // Any fetch error means we break out of the loop
          break;
        }
      }

      if (mounted) {
        setImages(imgList);
        setLoading(false);
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Left arrow key

      if (event.keyCode === 37 && currentImageIndex > 0) {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
      }
      // Right arrow key
      else if (event.keyCode === 39 && currentImageIndex < images.length - 1) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        if (currentImageIndex === 16) {
          setSubtitle('AI Annihilation Arena: Chapter 1');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [images.length, currentImageIndex]);

  // Handles clicks for "Previous" and "Next" buttons
  const handlePreviousClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="App">
      {loading ? (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <h1 className="comic-title">Checkmate Productions</h1>
          <h2 className="comic-subtitle" key={subtitle}>{subtitle}</h2>
          <div className="viewer-container">
            <div className="prev-button-container" onClick={handlePreviousClick}></div>
            <img
              src={images[currentImageIndex]}
              alt="Webcomic Page"
              className="comic-image"
            />
            <br />
            <div className="next-button-container" onClick={handleNextClick}></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;