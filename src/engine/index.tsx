import { SharedValue } from 'react-native-reanimated';

import { carWidth, wheelRadius } from '../constants';

import { cameraPosition, mapSize } from '../constants';
import { ICar, IWheel } from '../models/car';
import { checkCollisions } from './collisions';

const pixelsByOneDeg = (Math.PI * wheelRadius * 1) / 180;

export const loop = (
  carMoving: SharedValue<ICar>,
  mapMoving: SharedValue<number>,
) => {
  const carMovingValue: ICar = JSON.parse(JSON.stringify(carMoving.value));
  const newCarPosition = {
    x: carMovingValue.position.x + carMovingValue.speed / 20,
    y: carMovingValue.position.y,
  };

  carMovingValue.wheels.forEach((wheel: IWheel) => {
    const newRotationWheelValue =
      (newCarPosition.x - carMovingValue.position.x) / pixelsByOneDeg +
      wheel.rotation;

    if (newRotationWheelValue > 360) {
      wheel.rotation = newRotationWheelValue - 360;
    } else {
      wheel.rotation = newRotationWheelValue;
    }
  });

  carMovingValue.position = newCarPosition;

  //check collision
  if (checkCollisions(carMovingValue.position)) {
    return;
  }

  carMoving.value = carMovingValue;
  mapMoving.value = carMovingValue.position.x - cameraPosition;
};
