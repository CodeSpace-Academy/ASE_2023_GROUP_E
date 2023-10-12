import React from "react";
import NumToTime from "./timeReadable";


export default function addTimes(prepTime, cookTime) {
  const totalTime = prepTime + cookTime;
  return totalTime;
}
