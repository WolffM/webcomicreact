import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './layout/Navbar.js';

function App() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState('Chapter 1');

  useEffect(() => {
    setCurrentImageIndex(0);
    let mounted = true;
    
    const loadImages = async (selectedChapter) => {
      let index =  1;
      let imgList = [];
    
      while (mounted) {
        const imagePath = `${process.env.PUBLIC_URL}/assets/${selectedChapter}/${index}.png`;
        
    
        try {
          const response = await fetch(imagePath);
          const contentType = response.headers.get("Content-Type");
          // Stop fetching if the image does not exist or is not an image file
          if (!response.ok || !contentType || !contentType.startsWith("image") || response.status ===  404) {
            console.log(`Failed to fetch image at path: ${imagePath}`);
            break;
          } else {
            imgList.push(imagePath);
            index++;
          }
        } catch (error) {
          console.error(`Error fetching image at path: ${imagePath}`, error);
          break;
        }
      }
    
      if (mounted) {
        setImages(imgList);
        setLoading(false);
      }
    };

    loadImages(selectedChapter);

    return () => {
      mounted = false;
    };
  }, [selectedChapter]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Left arrow key

      if (event.keyCode === 37 && currentImageIndex > 0) {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
      }
      // Right arrow key
      else if (event.keyCode === 39 && currentImageIndex < images.length - 1) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [images, currentImageIndex]);

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
    <div className="App" key={selectedChapter}>
      {loading ? (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <h1 className="comic-title">Checkmate Productions</h1>
          <Navbar setSelectedChapter={setSelectedChapter} />
          <h2 className="comic-subtitle" key={selectedChapter}>{selectedChapter}</h2>
          
            <div className="prev-button-container" onClick={handlePreviousClick}></div>
            <img
              src={images[currentImageIndex]}
              alt="Webcomic Page"
              className="comic-image"
            />
            <br />
            <div className="next-button-container" onClick={handleNextClick}></div>
          
        </>
      )}
    </div>
  );
}

export default App;