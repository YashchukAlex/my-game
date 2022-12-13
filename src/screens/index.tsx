//libraries
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

//components
import Floor from '../components/floor/index';
import Car from '../components/car';
import ToolControlSpeed from '../components/toolControlSpeed';

//utils
import { Car as CarType, Wheel } from '../engine/entities';
import { loop } from '../engine';
import { frameDelay } from '../constants';

//assets
import RefreshSVG from '../assets/refresh';

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

  const refreshGame = () => {
    mapMoving.value = 0;
    const newCarValue: CarType = JSON.parse(JSON.stringify(carMoving.value));
    newCarValue.position.x = 0;
    carMoving.value = newCarValue;
    setCarSpeed(0);
  };

  return (
    <>
      <TouchableOpacity onPress={refreshGame} style={styles.refreshButton}>
        <RefreshSVG width={35} height={35} />
      </TouchableOpacity>
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
  refreshButton: {
    position: 'absolute',
    left: 30,
    top: 30,
    zIndex: 999,
  },
});
