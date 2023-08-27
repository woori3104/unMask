import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { ImageInfo } from "../imageList";
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

const MultipleChoice: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useRecoilState(isAnswerCorrectState);
  const [usedIds, setUsedIds] = useState<number[]>([]);
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [currentImage, setCurrentImage] = useRecoilState(imageState);

  const [, setElapsedTime] = useRecoilState(elapsedTimeState);
  const [, setIsImageLoaded] = useRecoilState(isImageLoadedState);
  const [viewWidth, setViewWidth] = useRecoilState(viewWidthState);
  const [viewHeight, setViewHeight] = useRecoilState(viewHeightState);
  const [, setStartX] = useRecoilState(startXState);
  const [, setStartY] = useRecoilState(startYState);
  const [, setTotalTime] = useRecoilState(totalTimeState);
  const [score, setScore] = useRecoilState(scoreState);
  const uniquePlayers: string[] = [
    ...new Set(ImageInfo.map((info) => info.player)),
  ];

  useEffect(() => {
    const initialId = getRandomId();
    const initialImg = ImageInfo.find((img) => img.id === initialId)?.src;
    const initialPlayer = ImageInfo.find((img) => img.id === initialId)?.player;

    setCurrentId(initialId);
    setCurrentImage(initialImg || "");
    setCurrentPlayer(initialPlayer || "");

    updateOptions(initialPlayer || "");
  }, []);

  useEffect(() => {
    updateOptions(currentPlayer);
  }, [currentImage, currentPlayer]);

  const updateOptions = (correctPlayer: string) => {
    let shuffledPlayers = shuffleArray(
      uniquePlayers.filter((p) => p !== correctPlayer)
    ).slice(0, 2);
    shuffledPlayers.push(correctPlayer); // 정답 추가
    setOptions(shuffleArray(shuffledPlayers)); // 다시 섞어서 정답의 위치를 무작위로
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  function getRandomId(): number {
    let newId: number;
    do {
      newId = ImageInfo[Math.floor(Math.random() * ImageInfo.length)].id;
    } while (usedIds.includes(newId));
    return newId;
  }

  function shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  const moveToNext = () => {
    if (usedIds.length >= ImageInfo.length) {
      alert("게임 종료! 총 점수는 " + score + "점 입니다.");
      return;
    }
    const newId = getRandomId();

    setUsedIds((prev) => [...prev, currentId]);
    const newImg = ImageInfo.find((img) => img.id === newId)?.src;

    const newPlayer = ImageInfo.find((img) => img.id === newId)?.player;
    setCurrentImage(newImg || "");
    setCurrentPlayer(newPlayer || "");
    setIsCorrect(false);
    setCurrentId(newId);
    setViewWidth(10);
    setViewHeight(10);
    const initialX = Math.random() * (100 - viewWidth);
    const initialY = Math.random() * (100 - viewHeight);
    setStartX(initialX);
    setStartY(initialY);
    setElapsedTime(0);
    setTotalTime(10);
    setIsImageLoaded(false);
  };

  const checkAnswer = () => {
    if (selected === currentPlayer) {
      alert("정답입니다!");
      setIsCorrect(true);
      setSelected(null);
    } else {
      alert("틀렸습니다.");
      setScore((prev) => prev - 50);
      setSelected(null);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={selected === option}
            onChange={handleOptionChange}
          />
          {option}
        </label>
      ))}
      <button onClick={checkAnswer}>확인</button>
      <div>점수 : {score}</div>
      {isCorrect && <button onClick={moveToNext}>다음으로</button>}
    </div>
  );
};

export default MultipleChoice;
