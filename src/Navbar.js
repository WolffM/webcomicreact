export default function Navbar({setCurrentImageIndex, images, currentImageIndex}) {
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
    <div className="Navbar">
      <button className="navButton" onClick={handlePreviousClick}>Previous</button>
      <button className="navButton" onClick={handleNextClick}>Next</button>
    </div>
  )
}