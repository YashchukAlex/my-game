import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';

import WheelSVG from '../../assets/wheel.svg';
import CarSVG from '../../assets/car.svg';
import { frameDelay } from '../../constants';

const carWidth = 200;
const wheelRadius = 16;
const wheelPositionLeft = carWidth * 0.14;
const wheelPositionRight = carWidth * 0.773;

const pixelsByOneDeg = (Math.PI * wheelRadius * 1) / 180;

const loop = function (
  moving: SharedValue<number>,
  rotation: SharedValue<number>,
  speed: number,
) {
  const newMovingValue = moving.value + speed / 20;

  const newRotationValue =
    (newMovingValue - moving.value) / pixelsByOneDeg + rotation.value;

  if (newRotationValue > 360) {
    rotation.value = newRotationValue - 360;
  } else {
    rotation.value = newRotationValue;
  }

  moving.value = newMovingValue;
};

interface iProps {
  speed: number;
  mapMoving: SharedValue<number>;
}

export default ({ speed, mapMoving }: iProps) => {
  const rotation = useSharedValue(0);
  const moving = useSharedValue(0);

  useEffect(() => {
    if (speed) {
      const interval = setInterval(function tick() {
        loop(moving, rotation, speed);
      }, frameDelay);
      return () => clearInterval(interval);
    }
  }, [speed]);

  const animatedStylesWheelLeft = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
      left: moving.value + wheelPositionLeft,
    };
  }, [moving.value]);

  const animatedStylesWheelRight = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
      left: moving.value + wheelPositionRight,
    };
  }, [moving.value]);

  const animatedStylesCar = useAnimatedStyle(() => {
    mapMoving.value = moving.value;

    return {
      left: moving.value,
    };
  }, [moving.value]);

  return (
    <>
      <Animated.View style={[styles.car, animatedStylesCar]}>
        <CarSVG width={carWidth} height={carWidth / 2} />
      </Animated.View>
      <Animated.View style={[styles.wheel, animatedStylesWheelLeft]}>
        <WheelSVG
          width={wheelRadius * 2}
          height={wheelRadius * 2}
          fill={'black'}
        />
      </Animated.View>
      <Animated.View style={[styles.wheel, animatedStylesWheelRight]}>
        <WheelSVG
          width={wheelRadius * 2}
          height={wheelRadius * 2}
          fill={'black'}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  car: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: -7,
    zIndex: 2,
  },
  wheel: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: wheelRadius * 2,
    bottom: 10,
    zIndex: 1,
  },
});
