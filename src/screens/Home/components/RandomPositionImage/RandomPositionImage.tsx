import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import "./RandomPositionImage.scss";

export interface RandomPositionImageProps {
  imageUrl: string;

  animationType: string;
  previousX: number;
  previousY: number;
  currentX: number;
  currentY: number;
}
interface StyledDivProps {
  x: number;
  y: number;

  // animationType: {
  //   type: string;
  //   valueX: number;
  //   valueY: number;
  //   previousX: number;
  //   previousY: number;
  // };

  animationType: string;
  currentX: number;
  currentY: number;
  previousX: number;
  previousY: number;
}

function randomBetweenNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const translateRandom = (
  topPercentage: number,
  leftPercentage: number
) => keyframes`
  0% {

    left: 120%;
    visibility: hidden;
    opacity: 0;
  }
  50% {
      opacity: 0.3;
  }
  100% {
    /* transform: translateX(0%); */
    top: ${topPercentage / 100}%;
    left: ${leftPercentage / 100}%;
    visibility: visible;
    opacity: 1;
  }
  `;

const moveToPositionAnim = (
  previousTopPercentage: number,
  previousLeftPercentage: number,
  topPercentage: number,
  leftPercentage: number
) => keyframes`
  0% { 
    top: ${previousTopPercentage / 100}%;
    left: ${previousLeftPercentage / 100}%;
    visibility: visible;
    opacity: 1;
  }
  100% { 
    top: ${topPercentage / 100}%;
    left: ${leftPercentage / 100}%;
    opacity: 1;
    visibility: visible;
  }
`;

const StyledDiv = styled.div<StyledDivProps>`
  position: absolute;
  visibility: hidden;
  /* opacity: 0; */

  left: ${(props) => props.currentX / 100}%;
  top: ${(props) => props.currentY / 100}%;

  animation: ${(props) =>
      props.animationType === "initial"
        ? translateRandom(props.currentY, props.currentX)
        : moveToPositionAnim(
            props.previousY,
            props.previousX,
            props.currentY,
            props.currentX
          )}
    ${(props) =>
      props.animationType === "initial"
        ? randomBetweenNumber(1000, 2000)
        : randomBetweenNumber(300, 450)}ms
    ${(props) =>
      props.animationType === "initial"
        ? `cubic-bezier(0.1, 1.11, 1, 0.99)`
        : `ease`}
    forwards;

  animation-delay: ${(props) =>
    props.animationType === "initial" ? randomBetweenNumber(0, 800) : 0}ms;
`;

const RandomPositionImage: React.FC<RandomPositionImageProps> = (
  props: RandomPositionImageProps
) => {
  console.log("Props: ", props);
  // const [animationType, setAnimationType] = useState({
  //   type: "initial",
  //   valueX: 0,
  //   valueY: 0,
  //   previousX: 0,
  //   previousY: 0,
  // });
  const [imageWidth, setImageWidth] = useState(randomBetweenNumber(250, 350));

  // useEffect(() => {
  //   // const randomDim = getRandomDimensionsPercentages();
  //   setAnimationType({
  //     type: props.animationType || "initial",
  //     valueX: props.currentX / 100,
  //     // valueX: randomDim.width / 100,
  //     valueY: props.currentY / 100,
  //     // valueY: randomDim.height / 100,
  //     previousX: props.previousX || 0,
  //     // previousX: 0,
  //     previousY: props.previousY || 0,
  //     // previousY: 0,
  //   });
  // }, []);

  function getRandomDimensionsPercentages() {
    const width = randomBetweenNumber(0 * 100, 75 * 100);
    const height = randomBetweenNumber(0 * 100, 80 * 100);
    return { width, height };
  }

  const randomDim = getRandomDimensionsPercentages();

  // function handleToggleAnimation() {
  //   const randomDim = getRandomDimensionsPercentages();

  //   console.log("Random dim: ", randomDim);

  //   setAnimationType((current) => {
  //     // return {
  //     //   type: "reorder",
  //     //   previousX: current.valueX,
  //     //   previousY: current.valueY,
  //     //   valueX: randomDim.width / 100,
  //     //   valueY: randomDim.height / 100,
  //     // };

  //     return {
  //       type: "reorder",
  //       previousX: current.valueX,
  //       previousY: current.valueY,
  //       valueX: props.currentX / 100,
  //       valueY: props.currentY / 100,
  //     };
  //   });
  // }

  return (
    <StyledDiv
      // key={new Date().toString()}
      y={props.currentY}
      x={props.currentX}
      animationType={props.animationType}
      currentX={props.currentX}
      currentY={props.currentY}
      previousX={props.previousX}
      previousY={props.previousY}
      className="image-item-container"
    >
      <img
        src={props.imageUrl}
        style={{ maxWidth: imageWidth }}
        className="image"
      />

      {/* <button style={{ zIndex: 999 }} onClick={handleToggleAnimation}>
        Test
      </button> */}
    </StyledDiv>
  );
};

export default RandomPositionImage;
