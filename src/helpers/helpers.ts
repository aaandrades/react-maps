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
const isMarkerInsidePolygon = (
  marker: Array<number>,
  poly: Array<Array<number>>
) => {
  const polyPoints = poly;
  const x = marker[1];
  const y = marker[0];

  let inside = false;
  for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    const xi = polyPoints[i][0];
    const yi = polyPoints[i][1];
    const xj = polyPoints[j][0];
    const yj = polyPoints[j][1];

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

export { randomizePoints, getMaximunValue, isMarkerInsidePolygon };
