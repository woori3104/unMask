// hooks/useTimer.ts

import { useRecoilState } from "recoil";
import {
  elapsedTimeState,
  imageState,
  isAnswerCorrectState,
  isImageLoadedState,
  scoreState,
  startXState,
  startYState,
  totalTimeState,
  viewHeightState,
  viewWidthState,
} from "../store/atom";

const SCORE_DEDUCTION = 10;

export const useTimer = () => {
  const [viewWidth, setViewWidth] = useRecoilState(viewWidthState);
  const [viewHeight, setViewHeight] = useRecoilState(viewHeightState);
  const [startX, setStartX] = useRecoilState(startXState);
  const [startY, setStartY] = useRecoilState(startYState);
  const [isAnswerCorrect] = useRecoilState(isAnswerCorrectState);
  const [, setScore] = useRecoilState(scoreState);
  const [elapsedTime, setElapsedTime] = useRecoilState(elapsedTimeState);
  const [currentImageName, setCurrentImageName] = useRecoilState(imageState);
  const [totlaTime, setTotlaTime] = useRecoilState(totalTimeState);
  const [isImageLoaded, setIsImageLoaded] = useRecoilState(isImageLoadedState);

  const isStartGame = elapsedTime < totlaTime && !isAnswerCorrect && isImageLoaded

  const deductScoreAfterElapsedTime = (time:number) => {
    if (elapsedTime > time) {
      setScore((prevScore) => prevScore - SCORE_DEDUCTION);
    }
    setElapsedTime((prevTime) => prevTime + 0.5);
  }
  return {
    isStartGame,
    deductScoreAfterElapsedTime

  };
};
