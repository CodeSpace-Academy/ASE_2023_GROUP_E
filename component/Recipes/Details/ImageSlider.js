import Image from "next/image";
import { useState } from "react";
import { GrNext, GrPrevious } from 'react-icons/gr'
import classes from './imageSlider.module.css' 

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
    <div className={classes.imageSlider}>
      <div>
        <button onClick={goToPrevious}><GrPrevious/></button>
      </div>
      <div className={classes.imageContainer}>
        <Image className={classes.img} src={imageUrls[currentIndex]} alt="Recipe" width={200} height={200}/>
      </div>
      <div>
        <button onClick={goToNext}><GrNext/></button>
      </div>
    </div>
  );
};

export default ImageSlider;
