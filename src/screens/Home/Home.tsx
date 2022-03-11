import React, { useEffect, useState } from "react";
import "./Home.scss";

import RefreshIcon from "../../assets/images/icon-refresh.svg";
import IGLogo from "../../assets/images/logo-ig.svg";
import IconMail from "../../assets/images/icon-mail.png";
import RandomPositionImage, {
  RandomPositionImageProps,
} from "./components/RandomPositionImage/RandomPositionImage";

import I1 from "../../assets/images/1.jpg";
import I2 from "../../assets/images/2.jpg";
import I3 from "../../assets/images/3.jpg";
import I4 from "../../assets/images/4.jpg";
import I5 from "../../assets/images/5.jpg";
import I6 from "../../assets/images/6.jpg";
import I7 from "../../assets/images/7.jpg";
import I8 from "../../assets/images/8.jpg";
import I9 from "../../assets/images/9.jpg";

import { CSSTransition } from "react-transition-group";
import TextAreaSubmitMessage from "./components/TextAreaSubmitMessage/TextAreaSubmitMessage";
import { timeout } from "../../services/timeout";

import { FirestoreMessage } from "../../services/message";

const TEMPLATE_DATA = [I1, I2, I3, I4, I5, I6, I7, I8, I9];

function randomBetweenNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDimensionsPercentages() {
  const width = randomBetweenNumber(0 * 100, 75 * 100);
  const height = randomBetweenNumber(0 * 100, 80 * 100);
  return { width, height };
}

function goToUrl(url: string) {
  return window.open(url, "_blank");
}

const HomeScreen: React.FC = () => {
  const [dimention, setDimention] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [data, setData] = useState<RandomPositionImageProps[]>([]);
  const [visible, setVisible] = useState(true);
  const [currentMessage, setMessage] = useState<{
    text: string;
    timestamp: string;
  } | null>(null);
  const [isLoading, setLoading] = useState(false);

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

  useEffect(() => {
    (async () => {
      let currentIndex = 0;
      const timer = 1500;
      await timeout(timer + 1000);

      const MessageHandler = new FirestoreMessage();
      const messages = await MessageHandler.getAllMessages();
      const parsedMessages = messages.map((m) => {
        return {
          text: m.text,
          timestamp: m.creation_time.toDate().toString(),
        };
      });

      if (!parsedMessages.length) {
        return;
      }

      setMessage(parsedMessages[0]);

      if (parsedMessages.length === 1) {
        return;
      }

      while (true) {
        await timeout(timer + 2500);

        if (currentIndex >= parsedMessages.length - 1) {
          currentIndex = 0;
        } else {
          currentIndex = currentIndex + 1;
        }

        setVisible(false);
        await timeout(500);
        setMessage(parsedMessages[currentIndex]);
        await timeout(timer);
        setVisible(true);
      }
    })();
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

  async function handleOnTextSubmit(text: string) {
    if (!text) {
      return;
    }

    setLoading(true);
    const MessageHandler = new FirestoreMessage();
    await MessageHandler.addMessage(text);

    setLoading(false);

    alert("Your message is added! Refresh the page and wait to see it! C:");
  }

  return (
    <div className="Home">
      <button className="reorder-btn" onClick={handleReorderImages}>
        <img src={RefreshIcon} style={{ width: 30 }} />
        <p>Reorder collage!</p>
      </button>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100vh",
          width: "100vw",
        }}
      >
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
        <h1 className="title">Welcome to Mia's Home</h1>
        <div className="inbox-container">
          <div className="header">
            <img src={IconMail} className="icon" />
            <h1>Message!* </h1>
          </div>
          <div className="divider" />

          <CSSTransition
            in={visible}
            classNames="st-name"
            addEndListener={() => {}}
          >
            {currentMessage ? (
              <div>
                <p className="description-timestamp">
                  {currentMessage.timestamp}
                </p>
                <p className="description">{currentMessage.text}</p>
              </div>
            ) : (
              // <p className="description">No messages :(</p>
              <div></div>
            )}
          </CSSTransition>
        </div>

        <div className="text-area-container">
          <h1 className="header">Leave a message to Mia!</h1>
          <TextAreaSubmitMessage
            onSubmit={(val) => handleOnTextSubmit(val)}
            submitDisabled={isLoading}
          />
        </div>

        <div className="socials-container">
          <img
            src={IGLogo}
            onClick={() => goToUrl("https://www.instagram.com/miathehedgiie/")}
          />
        </div>

        <span className="credits">
          Developed by{" "}
          <span
            className="author"
            onClick={() => goToUrl("https://www.twitter.com/theminifelix")}
          >
            MiniFelix
          </span>
        </span>
      </div>
    </div>
  );
};

export default HomeScreen;
