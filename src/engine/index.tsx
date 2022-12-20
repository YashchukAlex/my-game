import { SharedValue } from 'react-native-reanimated';

import { cameraPosition } from '../constants';
import { ICar } from '../models/car';
import { checkCollisions } from './collisions';
import { settingNewWheelsRadius } from '../helpers/car';

export const loop = (
  carMoving: SharedValue<ICar>,
  mapMoving: SharedValue<number>,
) => {
  const carMovingValue: ICar = JSON.parse(JSON.stringify(carMoving.value));
  const newCarPosition = {
    x: carMovingValue.position.x + carMovingValue.speed / 20,
    y: carMovingValue.position.y,
  };

  settingNewWheelsRadius(carMovingValue, newCarPosition);

  carMovingValue.position = newCarPosition;

  //check collision
  if (checkCollisions(carMovingValue.position)) {
    return;
  }

  carMoving.value = carMovingValue;
  mapMoving.value = carMovingValue.position.x - cameraPosition;
};
