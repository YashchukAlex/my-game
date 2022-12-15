//libraries
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

//components
import Road from '../components/Road';
import Car from '../components/Car';
import CarPedals from '../components/CarPedals';

//utils
import { ICar } from '../models/car';
import { loop } from '../engine';
import {
  cameraPosition,
  frameDelay,
  leftWheelPosition,
  rightWheelPosition,
  carSpeed,
  carPosition,
} from '../constants';

//assets
import RefreshSVG from '../assets/refresh.svg';
import { ControlMoveCar } from '../models/carTools';

export default () => {
  const [carMovingToolsStatus, setCarMovingToolsStatus] =
    useState<ControlMoveCar>(ControlMoveCar.NOT_USING);
  const mapMoving = useSharedValue(cameraPosition);
  const carMoving = useSharedValue<ICar>({
    position: carPosition,
    speed: 0,
    wheels: [
      { position: leftWheelPosition, rotation: 0 },
      { position: rightWheelPosition, rotation: 0 },
    ],
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -mapMoving.value,
        },
      ],
    };
  }, [mapMoving]);

  useEffect(() => {
    const interval = setInterval(function tick() {
      loop(carMoving, mapMoving);
    }, frameDelay);
    return () => clearInterval(interval);
  }, [mapMoving, carMoving]);

  useEffect(() => {
    if (carMovingToolsStatus === ControlMoveCar.MOVING_FORWARD) {
      carMoving.value.speed = carSpeed;
    } else if (carMovingToolsStatus === ControlMoveCar.MOVING_BACK) {
      carMoving.value.speed = -carSpeed;
    } else {
      carMoving.value.speed = 0;
    }
  }, [carMoving, carMovingToolsStatus]);

  const refreshGame = () => {
    mapMoving.value = cameraPosition;
    const newCarValue: ICar = JSON.parse(JSON.stringify(carMoving.value));
    newCarValue.position = carPosition;
    newCarValue.speed = 0;
    newCarValue.wheels = [
      { position: leftWheelPosition, rotation: 0 },
      { position: rightWheelPosition, rotation: 0 },
    ];
    carMoving.value = newCarValue;
    setCarMovingToolsStatus(ControlMoveCar.NOT_USING);
  };

  return (
    <>
      <TouchableOpacity onPress={refreshGame} style={styles.refreshButton}>
        <RefreshSVG width={35} height={35} />
      </TouchableOpacity>
      <CarPedals
        movingStatus={carMovingToolsStatus}
        changeMovingStatus={setCarMovingToolsStatus}
      />
      <Animated.View style={[styles.container, animatedStyles]}>
        <Car carMoving={carMoving} />
        <Road />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshButton: {
    position: 'absolute',
    left: 30,
    top: 30,
    zIndex: 999,
  },
});
