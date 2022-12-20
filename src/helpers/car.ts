import { wheelRadius } from '../constants';
import { ICar, IWheel, Position } from '../models/car';
import { CarPedal, ControlMoveCar } from '../models/carTools';

export const pixelsByOneDeg = (Math.PI * wheelRadius * 1) / 180;

export const settingNewWheelsRadius = (
  carMovingValue: ICar,
  newCarPosition: Position,
) => {
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
};

export const getCarMovingToolsStatus = (
  activeButtons: Array<CarPedal>,
): ControlMoveCar => {
  if (activeButtons.length) {
    if (activeButtons.length === 1) {
      return activeButtons[0] === CarPedal.GAS
        ? ControlMoveCar.MOVING_FORWARD
        : ControlMoveCar.MOVING_BACK;
    } else {
      return ControlMoveCar.MOVING_BACK;
    }
  } else {
    return ControlMoveCar.NOT_USING;
  }
};
