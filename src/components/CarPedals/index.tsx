import React from 'react';
import { StyleSheet } from 'react-native';

import Button from '../common/Button';

import BrakePedalSVG from '../../assets/brake-pedal.svg';
import {
  CarPedal,
  CarPedalEventType,
  ControlMoveCar,
} from '../../models/carTools';

interface IProps {
  movingStatus: ControlMoveCar;
  changeMovingStatus: Function;
}

const activeButtons: Array<CarPedal> = [];

export default ({ changeMovingStatus, movingStatus }: IProps) => {
  const handleChange = (buttonType: CarPedal, eventType: CarPedalEventType) => {
    if (movingStatus === ControlMoveCar.NOT_USING) {
      buttonType === CarPedal.GAS
        ? changeMovingStatus(ControlMoveCar.MOVING_FORWARD)
        : changeMovingStatus(ControlMoveCar.MOVING_BACK);
    } else {
      if (eventType === CarPedalEventType.ON_PRESS_IN) {
        activeButtons.push(buttonType);
        if (buttonType === CarPedal.BRAKE) {
          changeMovingStatus(ControlMoveCar.MOVING_BACK);
        }
      } else {
        activeButtons.filter((el: CarPedal) => el !== buttonType);
        if (activeButtons.length) {
          buttonType === CarPedal.GAS
            ? changeMovingStatus(ControlMoveCar.MOVING_FORWARD)
            : changeMovingStatus(ControlMoveCar.MOVING_BACK);
        } else {
          changeMovingStatus(ControlMoveCar.NOT_USING);
        }
      }
    }
  };
  return (
    <>
      <Button
        style={[styles.pedal, styles.brakePedal]}
        onPressIn={() =>
          handleChange(CarPedal.BRAKE, CarPedalEventType.ON_PRESS_IN)
        }
        onPressOut={() =>
          handleChange(CarPedal.BRAKE, CarPedalEventType.ON_PRESS_OUT)
        }
        key={CarPedal.BRAKE}>
        <BrakePedalSVG width={50} height={100} fill={'#000000'} />
      </Button>
      <Button
        style={[styles.pedal, styles.gasPedal]}
        onPressIn={() =>
          handleChange(CarPedal.GAS, CarPedalEventType.ON_PRESS_IN)
        }
        onPressOut={() =>
          handleChange(CarPedal.GAS, CarPedalEventType.ON_PRESS_OUT)
        }
        key={CarPedal.GAS}>
        <BrakePedalSVG width={50} height={100} fill={'#000000'} />
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  pedal: {
    position: 'absolute',
    bottom: 20,
    zIndex: 999,
  },
  gasPedal: { right: 40 },
  brakePedal: { left: 40 },
});
