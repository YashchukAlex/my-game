import React from 'react';
import { StyleSheet } from 'react-native';

import Button from '../common/Button';

import BrakePedalSVG from '../../assets/brake-pedal.svg';

interface IProps {
  movingStatus: ToolControlSpeedStatus;
  changeMovingStatus: Function;
}

export enum ToolControlSpeedStatus {
  MOVING_FORWARD,
  MOVING_BACK,
  NOT_USING,
}

enum ToolButtonType {
  GAS,
  BRAKE,
}

enum EventType {
  ON_PRESS_IN,
  ON_PRESS_OUT,
}

const activeButtons: Array<ToolButtonType> = [];

export default ({ changeMovingStatus, movingStatus }: IProps) => {
  const handleChange = (buttonType: ToolButtonType, eventType: EventType) => {
    if (movingStatus === ToolControlSpeedStatus.NOT_USING) {
      buttonType === ToolButtonType.GAS
        ? changeMovingStatus(ToolControlSpeedStatus.MOVING_FORWARD)
        : changeMovingStatus(ToolControlSpeedStatus.MOVING_BACK);
    } else {
      if (eventType === EventType.ON_PRESS_IN) {
        activeButtons.push(buttonType);
        if (buttonType === ToolButtonType.BRAKE) {
          changeMovingStatus(ToolControlSpeedStatus.MOVING_BACK);
        }
      } else {
        activeButtons.filter((el: ToolButtonType) => el !== buttonType);
        if (activeButtons.length) {
          buttonType === ToolButtonType.GAS
            ? changeMovingStatus(ToolControlSpeedStatus.MOVING_FORWARD)
            : changeMovingStatus(ToolControlSpeedStatus.MOVING_BACK);
        } else {
          changeMovingStatus(ToolControlSpeedStatus.NOT_USING);
        }
      }
    }
  };
  return (
    <>
      <Button
        style={[styles.pedal, styles.brakePedal]}
        onPressIn={() =>
          handleChange(ToolButtonType.BRAKE, EventType.ON_PRESS_IN)
        }
        onPressOut={() =>
          handleChange(ToolButtonType.BRAKE, EventType.ON_PRESS_OUT)
        }
        key={ToolButtonType.BRAKE}>
        <BrakePedalSVG width={50} height={100} fill={'#000000'} />
      </Button>
      <Button
        style={[styles.pedal, styles.gasPedal]}
        onPressIn={() =>
          handleChange(ToolButtonType.GAS, EventType.ON_PRESS_IN)
        }
        onPressOut={() =>
          handleChange(ToolButtonType.GAS, EventType.ON_PRESS_OUT)
        }
        key={ToolButtonType.GAS}>
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
