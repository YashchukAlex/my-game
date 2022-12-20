import { useCallback, useEffect } from 'react';
import { SharedValue } from 'react-native-reanimated';

import { cameraPosition, frameDelay } from '../constants';
import { ICar } from '../models/car';
import { checkCollisions } from './collisions';
import { settingNewWheelsRadius } from '../helpers/car';

interface IProps {
  carMoving: SharedValue<ICar>;
  mapMoving: SharedValue<number>;
}

export default ({ carMoving, mapMoving }: IProps): null => {
  const loop = useCallback(() => {
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
  }, [carMoving, mapMoving]);

  useEffect(() => {
    const interval = setInterval(function tick() {
      loop();
    }, frameDelay);
    return () => clearInterval(interval);
  }, [loop]);

  return null;
};
