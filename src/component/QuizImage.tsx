import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useQuizImage } from "../hook/useQuizImage";
import { useTimer } from "../hook/useTimer";
import {
  imageState,
  isAnswerCorrectState,
  isImageLoadedState,
  startXState,
  startYState,
  viewHeightState,
  viewWidthState,
} from "../store/atom";

const QuizImage: React.FC = () => {
  const [viewWidth, ] = useRecoilState(viewWidthState);
  const [viewHeight, ] = useRecoilState(viewHeightState);
  const [startX, ] = useRecoilState(startXState);
  const [startY, ] = useRecoilState(startYState);
  const [isAnswerCorrect] = useRecoilState(isAnswerCorrectState);
  const [currentImageName,] = useRecoilState(imageState);
  const [, setIsImageLoaded] = useRecoilState(isImageLoadedState);

  const {
    initialSetting,
    correctAnswerSetting,
    expandImageViewport,
    adjustImageStartPosition,
  } = useQuizImage();
  const { isStartGame, deductScoreAfterElapsedTime } = useTimer();
  useEffect(() => {
    initialSetting(100, 100);

    if (isStartGame) {
      const timer = setInterval(() => {
        deductScoreAfterElapsedTime(3);

        if (viewWidth < 100 && viewHeight < 100) {
          expandImageViewport();
          adjustImageStartPosition();
        } else {
          clearInterval(timer);
        }
      }, 500);

      return () => clearInterval(timer);
    }
  }, [isStartGame]);

  useEffect(() => {
    if (isAnswerCorrect) {
      correctAnswerSetting();
    }
  }, [isAnswerCorrect]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "500px",
        height: "500px",
        position: "relative",
      }}
    >
      <img
        src={currentImageName}
        alt="quiz"
        onLoad={() => setIsImageLoaded(true)}
        style={{
          position: "absolute",
          top: `-${startY}%`,
          left: `-${startX}%`,
          width: `${viewWidth}%`,
          height: `${viewHeight}%`,
        }}
      />
    </div>
  );
};

export default QuizImage;
