import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar.js';

const storyList = ['AI-Arena', 'Misc'];
const MAX_IMAGES = 30;
const defaultNav = storyList[0];

function DynamicRouteComponent() {
  const location = useLocation();
  const story = location.pathname.split('/')[1] || defaultNav;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentImageIndex]);

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

  useEffect(() => {
    // Reset on story change
    setCurrentImageIndex(0);

    const loadImages = async () => {
      console.log("story is:", story)
      let currentstory = defaultNav;
      if(storyList.includes(story)){
        currentstory = story;
      }
      let index = 1;
      const imgList = [];

      let imageExists = true;
      while (imageExists) {
        try {
          const result = await fetchImage(currentstory, index);
          imgList.push(...result);
          index++;
        } catch (error) {
          console.error(`Error fetching image ${index} in ${story}`, error);
          imageExists = false;
        }
        if (index >= MAX_IMAGES) {
          imageExists = false;
        }
      }

      setImages(imgList);
      setLoading(false);
    };

    loadImages();
  }, [story]);

  const fetchImage = async (story, index) => {
    if (!story) return [];

    const imagePath = process.env.PUBLIC_URL + '/assets/' + story + '/' + index + '.png';
    console.log("Image Path:", imagePath);

    try {
      const response = await fetch(imagePath);
      const contentType = response.headers.get("Content-Type");

      if (!response.ok || !contentType || !contentType.startsWith("image") || response.status === 404) {
        console.log(`Failed to fetch image at path: ${imagePath}`);
        return [];
      } else {
        return [imagePath];
      }
    } catch (error) {
      console.error(`Error fetching image at path: ${imagePath}`, error);
      return [];
    }
  };
  return (
    <div>
      {loading ? (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <h1 className="comic-title">Checkmate Productions</h1>
          <Navbar />
          <h2 className="comic-subtitle" key={story}>{story}</h2>
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

function App() {
  return (
    <Router basename="/webcomicreact/">
      <div className="App">
        <Routes>
          <Route
            path="/:story"
            element={
              <DynamicRouteComponent />
            }
          />
          <Route
            path="/"
            element={
              <DynamicRouteComponent />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;