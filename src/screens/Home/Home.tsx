import React, { useEffect, useState } from "react";
import "./Home.scss";
import TestImage from "../../assets/images/test.jpg";
// import TestImage from "../../logo.svg";
import RandomPositionImage, {
  RandomPositionImageProps,
} from "./components/RandomPositionImage/RandomPositionImage";

// const data = ["a", "b", "c", "d", "e", "f", "g", "h"];
const TEMPLATE_DATA = [TestImage, TestImage, TestImage, TestImage, TestImage];

function randomBetweenNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDimensionsPercentages() {
  const width = randomBetweenNumber(0 * 100, 75 * 100);
  const height = randomBetweenNumber(0 * 100, 80 * 100);
  return { width, height };
}

const HomeScreen: React.FC = () => {
  const [dimention, setDimention] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [data, setData] = useState<RandomPositionImageProps[]>([]);

  useEffect(() => {
    const tempData = TEMPLATE_DATA.map((image) => {
      const randomDim = getRandomDimensionsPercentages();
      return {
        animationType: "initial",
        currentX: randomDim.width,
        currentY: randomDim.height,
        previousX: 0,
        previousY: 0,
        imageUrl: image,
      } as RandomPositionImageProps;
    });

    setData(tempData);
  }, []);

  function handleReorderImages() {
    const currentData = data.map((p) => {
      const randomDim = getRandomDimensionsPercentages();

      return {
        animationType: "reorder",
        currentX: randomDim.width,
        currentY: randomDim.height,
        previousX: p.currentX,
        previousY: p.currentY,
        imageUrl: p.imageUrl,
      } as RandomPositionImageProps;
    });

    setData(currentData);
  }

  return (
    <div className="Home">
      {/* Home width: {dimention.width} - height: {dimention.height} */}
      <button className="reorder-btn" onClick={handleReorderImages}>
        Test
      </button>
      <div>
        {data.map((p, i) => (
          <RandomPositionImage
            animationType={p.animationType}
            previousX={p.previousX}
            previousY={p.previousY}
            currentX={p.currentX}
            currentY={p.currentY}
            key={i.toString()}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
      <div className="container">
        <h1>Welcome to Mia's home</h1>
      </div>
    </div>
  );
};

export default HomeScreen;
