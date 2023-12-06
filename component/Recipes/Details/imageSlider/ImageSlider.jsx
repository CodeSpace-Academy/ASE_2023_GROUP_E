import Image from 'next/image';
import { useState, useEffect } from 'react';
import classes from './imageSlider.module.css';

/**
 * @module ImageSlider
 * @description A component that displays an image slider with next and previous navigation.
 * @param {Object} props - The component's properties.
 * @param {Array} props.imageUrls - An array of image URLs to be displayed in the slider.
 * @returns {React.Component}  React component displaying an image slider.
 */

const ImageSlider = ({ imageUrls }) => {
  // State to keep track of the current index in the imageUrls array
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide automatically
  const goAuto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  useEffect(() => {
    // Set an interval to change the image every 3.1 seconds
    const intervalId = setInterval(goAuto, 3100);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]); // Re-run this effect whenever currentIndex changes

  // Function to go to the next slide
  const goToNext = () => {
    const isLastSlide = currentIndex === imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const totalWidth = imageUrls.reduce((acc, imageUrl) => {
    return acc + 30; // Assuming each image has a width of 30
  }, 0);

  const totalHeight = imageUrls.reduce((acc, imageUrl) => {
    return acc + 30; // Assuming each image has a height of 30
  }, 0);

  // Render the image slider
  return (
    <div className={classes.container}>
      {/* Display the image using the next/image component */}
      <Image
        src={imageUrls[currentIndex]}
        alt="Recipe"
        width={totalWidth}
        height={totalHeight}
        className={classes.img}
      />
    </div>
  );
};

export default ImageSlider;
