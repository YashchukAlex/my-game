import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';

import WheelSVG from '../../assets/wheel.svg';
import CarSVG from '../../assets/car.svg';
import { Car } from '../../engine/entities';

export const carWidth = 200;
export const wheelRadius = 16;
const wheelPositionLeft = carWidth * 0.14;
const wheelPositionRight = carWidth * 0.773;
interface iProps {
  carMoving: SharedValue<Car>;
}

export default ({ carMoving }: iProps) => {
  const animatedStylesWheelLeft = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${carMoving.value.wheel.rotation}deg`,
        },
      ],
      left: carMoving.value.position.x + wheelPositionLeft,
    };
  }, [carMoving.value]);

  const animatedStylesWheelRight = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${carMoving.value.wheel.rotation}deg`,
        },
      ],
      left: carMoving.value.position.x + wheelPositionRight,
    };
  }, [carMoving.value]);

  const animatedStylesCar = useAnimatedStyle(() => {
    return {
      left: carMoving.value.position.x,
    };
  }, [carMoving.value]);

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
    bottom: -15,
    zIndex: 2,
  },
  wheel: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: wheelRadius * 2,
    bottom: 9,
    zIndex: 1,
  },
});
