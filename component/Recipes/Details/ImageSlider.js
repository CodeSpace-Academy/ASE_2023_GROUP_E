import Image from "next/image";
import { useState } from "react";

const ImageSlider = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="image-slider">
      <div className="image-container">
        <Image src={imageUrls[currentIndex]} alt="Recipe" width={200} height={200}/>
      </div>
      <div className="controls">
        <button onClick={goToPrevious}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </div>
    </div>
  );
};

export default ImageSlider;
