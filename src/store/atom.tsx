import { atom } from "recoil";

export const isAnswerCorrectState = atom({
  key: "isAnswerCorrectState",
  default: false,
});

export const scoreState = atom({
  key: "scoreState",
  default: 1000,
});

export const folderState = atom({
  key: "folderState",
  default: "",
});

export const playerListState = atom({
  key: "playerListState",
  default: [],
});

export const imageState = atom({
  key: "imageState",
  default: "",
});

export const viewWidthState = atom({
  key: "viewWidthState",
  default: 10,
});

export const viewHeightState = atom({
  key: "viewHeightState",
  default: 10,
});

export const startXState = atom({
  key: "startXState",
  default: 0,
});

export const startYState = atom({
  key: "startYState",
  default: 0,
});

export const totalTimeState = atom({
  key: "totlaTimeState",
  default: 10,
});

export const elapsedTimeState = atom({
  key: "elapsedTimeState",
  default: 0,
});

export const isImageLoadedState = atom({
  key: "isImageLoadedState",
  default: false,
});
