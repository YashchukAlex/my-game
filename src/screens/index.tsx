//libraries
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

//components
import Floor from '../components/floor/index';
import Car from '../components/car';
import ToolControlSpeed, {
  ToolControlSpeedStatus,
} from '../components/toolControlSpeed';

//utils
import { Car as CarType, Wheel } from '../engine/entities';
import { loop } from '../engine';
import { cameraPosition, frameDelay } from '../constants';

//assets
import RefreshSVG from '../assets/refresh.svg';

export default () => {
  const [carMovingToolsStatus, setCarMovingToolsStatus] =
    useState<ToolControlSpeedStatus>(ToolControlSpeedStatus.NOT_USING);
  const mapMoving = useSharedValue(cameraPosition);
  const carMoving = useSharedValue<CarType>(
    new CarType({ x: cameraPosition, y: 0 }, 0, new Wheel(0)),
  );

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
    if (carMovingToolsStatus === ToolControlSpeedStatus.MOVING_FORWARD) {
      carMoving.value.speed = 100;
    } else if (carMovingToolsStatus === ToolControlSpeedStatus.MOVING_BACK) {
      carMoving.value.speed = -100;
    } else {
      carMoving.value.speed = 0;
    }
  }, [carMoving, carMovingToolsStatus]);

  const refreshGame = () => {
    mapMoving.value = cameraPosition;
    const newCarValue: CarType = JSON.parse(JSON.stringify(carMoving.value));
    newCarValue.position = { x: cameraPosition, y: 0 };
    newCarValue.speed = 0;
    carMoving.value = newCarValue;
    setCarMovingToolsStatus(ToolControlSpeedStatus.NOT_USING);
  };

  return (
    <>
      <TouchableOpacity onPress={refreshGame} style={styles.refreshButton}>
        <RefreshSVG width={35} height={35} />
      </TouchableOpacity>
      <ToolControlSpeed
        movingStatus={carMovingToolsStatus}
        changeMovingStatus={setCarMovingToolsStatus}
      />
      <Animated.View style={[styles.container, animatedStyles]}>
        <Car carMoving={carMoving} />
        <Floor />
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
