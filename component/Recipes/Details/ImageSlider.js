import Image from "next/image";
import { useState, useEffect } from "react";
import { GrNext, GrPrevious } from 'react-icons/gr'
import classes from './imageSlider.module.css' 

const ImageSlider = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goAuto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  useEffect(() => {
    // Set an interval to change image every 3 seconds
    const intervalId = setInterval(goToNext, 3100);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]); // Re-run this effect whenever currentIndex changes

  // const goToPrevious = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? imageUrls.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  const goToNext = () => {
    const isLastSlide = currentIndex === imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="image-slider">
      <div className="image-container">
        <Image src={imageUrls[currentIndex]} alt="Recipe" width={400} height={200}/>
      </div>
      {/* <div className="controls">
        <button onClick={goToPrevious}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </div> */}
    </div>
  );
};

export default ImageSlider;
