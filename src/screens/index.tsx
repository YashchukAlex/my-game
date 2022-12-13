import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Floor from '../components/floor/index';
import Car from '../components/car';
import ToolControlSpeed from '../components/toolControlSpeed';

import { Car as CarType, Wheel } from '../engine/entities';
import { loop } from '../engine';
import { frameDelay } from '../constants';

export default () => {
  const [carSpeed, setCarSpeed] = useState<number>(0);
  const mapMoving = useSharedValue(0);
  const carMoving = useSharedValue<CarType>(
    new CarType({ x: 0, y: 0 }, 0, new Wheel(0)),
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
    carMoving.value.speed = carSpeed;
    if (carMoving.value.speed) {
      const interval = setInterval(function tick() {
        loop(carMoving, mapMoving);
      }, frameDelay);
      return () => clearInterval(interval);
    }
  }, [carSpeed, mapMoving, carMoving]);

  return (
    <>
      <ToolControlSpeed changeSpeed={setCarSpeed} />
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
});
