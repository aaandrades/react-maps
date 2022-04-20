import { IPoint } from "../Models/Interfaces";

const getMaximunValue = () => {
  return Math.floor(Math.random() * (100 - 21)) + 21;
};

const getMinimunValue = () => {
  return Math.floor(Math.random() * (20 - +1));
};

const randomizePoints = (points: IPoint[]) => {
  const newPoints = points.map((point: IPoint) => {
    return {
      ...point,
      minValue: getMinimunValue(),
      maxValue: getMaximunValue(),
    };
  });
  return newPoints;
};

export { randomizePoints, getMaximunValue };
