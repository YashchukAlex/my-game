import { carWidth } from './../components/car/index';
import { SharedValue } from 'react-native-reanimated';
import { wheelRadius } from '../components/car';
import { mapSize } from '../constants';

import { Car } from './entities';

const pixelsByOneDeg = (Math.PI * wheelRadius * 1) / 180;

export const loop = (
  carMoving: SharedValue<Car>,
  mapMoving: SharedValue<number>,
) => {
  const carMovingValue: Car = JSON.parse(JSON.stringify(carMoving.value));
  const newCarPosition = {
    x: carMovingValue.position.x + carMovingValue.speed / 20,
    y: carMovingValue.position.y,
  };

  const newRotationWheelValue =
    (newCarPosition.x - carMovingValue.position.x) / pixelsByOneDeg +
    carMovingValue.wheel.rotation;

  carMovingValue.position = newCarPosition;

  if (newRotationWheelValue > 360) {
    carMovingValue.wheel.rotation = newRotationWheelValue - 360;
  } else {
    carMovingValue.wheel.rotation = newRotationWheelValue;
  }

  //check collision
  if (carMovingValue.position.x > mapSize - carWidth) {
    return;
  }
  carMoving.value = carMovingValue;
  mapMoving.value = carMovingValue.position.x;
};
