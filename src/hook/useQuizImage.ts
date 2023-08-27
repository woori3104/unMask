// hooks/useQuizImage.ts

import { useRecoilState } from "recoil";
import {
  startXState,
  startYState,
  viewHeightState,
  viewWidthState,
} from "../store/atom";

export const useQuizImage = () => {
  const [viewWidth, setViewWidth] = useRecoilState(viewWidthState);
  const [viewHeight, setViewHeight] = useRecoilState(viewHeightState);
  const [, setStartX] = useRecoilState(startXState);
  const [, setStartY] = useRecoilState(startYState);

  const initialSetting= (x:number, y:number) => {
    const initialX = Math.random() * (x - viewWidth);
    const initialY = Math.random() * (y - viewHeight);
    setStartX(initialX);
    setStartY(initialY);
  }

  const correctAnswerSetting = () => {
    setViewWidth(100); 
    setViewHeight(100);
    setStartX(0);
    setStartY(0);
  }

  const expandImageViewport = () => {
    setViewWidth((prevWidth) => Math.min(100, prevWidth + 5));
    setViewHeight((prevHeight) => Math.min(100, prevHeight + 5));
  }

  const adjustImageStartPosition = () => {
      // 이미지의 끝에 도달하면 해당 방향으로 확장되지 않도록 로직 조정
      setStartX((prevX) => (prevX - 2.5 < 0 ? prevX : prevX - 2.5));
      setStartY((prevY) => (prevY - 2.5 < 0 ? prevY : prevY - 2.5));
  }


  return {
    initialSetting,
    correctAnswerSetting,
    expandImageViewport,
    adjustImageStartPosition

  };
};
