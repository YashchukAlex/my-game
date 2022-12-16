import { carWidth, mapSize } from '../constants';
import { Position } from '../models/car';
export const checkCollisions = (carPosition: Position): Boolean => {
  //right wall
  if (carPosition.x >= mapSize - carWidth / 2) {
    return true;
  }

  //left wall
  if (carPosition.x - carWidth / 2 <= 0) {
    return true;
  }

  return false;
};
