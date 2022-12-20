import React from 'react';
import { StyleSheet, View } from 'react-native';

import BrakePedalSVG from '../../assets/brake-pedal.svg';
import {
  CarPedal,
  CarPedalEventType,
  ControlMoveCar,
} from '../../models/carTools';
import { getCarMovingToolsStatus } from '../../helpers/car';

interface IProps {
  movingStatus: ControlMoveCar;
  changeMovingStatus: Function;
}

let activeButtons: Array<CarPedal> = [];

export default ({ changeMovingStatus }: IProps) => {
  const handleChange = (buttonType: CarPedal, eventType: CarPedalEventType) => {
    if (eventType === CarPedalEventType.ON_PRESS_IN) {
      if (activeButtons.findIndex(el => el === buttonType) === -1) {
        activeButtons.push(buttonType);
      }
    } else {
      activeButtons = activeButtons.filter((el: CarPedal) => el !== buttonType);
    }
    changeMovingStatus(getCarMovingToolsStatus(activeButtons));
  };
  return (
    <>
      <View
        style={[styles.pedal, styles.brakePedal]}
        onTouchStart={() =>
          handleChange(CarPedal.BRAKE, CarPedalEventType.ON_PRESS_IN)
        }
        onTouchEnd={() =>
          handleChange(CarPedal.BRAKE, CarPedalEventType.ON_PRESS_OUT)
        }
        key={CarPedal.BRAKE}>
        <BrakePedalSVG width={50} height={100} fill={'#000000'} />
      </View>
      <View
        style={[styles.pedal, styles.gasPedal]}
        onTouchStart={() =>
          handleChange(CarPedal.GAS, CarPedalEventType.ON_PRESS_IN)
        }
        onTouchEnd={() =>
          handleChange(CarPedal.GAS, CarPedalEventType.ON_PRESS_OUT)
        }
        key={CarPedal.GAS}>
        <BrakePedalSVG width={50} height={100} fill={'#000000'} />
      </View>
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
