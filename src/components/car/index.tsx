import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';

import WheelSVG from '../../assets/wheel.svg';
import CarSVG from '../../assets/car.svg';
import { ICar } from '../../models/car';

import { carWidth, carHeight, wheelRadius } from '../../constants';
interface iProps {
  carMoving: SharedValue<ICar>;
}

export default ({ carMoving }: iProps) => {
  const animatedStylesWheelLeft = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${carMoving.value.wheels[0].rotation}deg`,
        },
      ],
      left: carMoving.value.wheels[0].position.x,
      bottom: carMoving.value.wheels[0].position.y,
    };
  }, [carMoving.value]);

  const animatedStylesWheelRight = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${carMoving.value.wheels[1].rotation}deg`,
        },
      ],
      left: carMoving.value.wheels[1].position.x,
      bottom: carMoving.value.wheels[1].position.y,
    };
  }, [carMoving.value]);

  const animatedStylesCar = useAnimatedStyle(() => {
    return {
      left: carMoving.value.position.x,
      bottom: carMoving.value.position.y,
    };
  }, [carMoving.value]);

  const wheelSize = wheelRadius * 2;

  return (
    <Animated.View style={[styles.car, animatedStylesCar]}>
      <View>
        <CarSVG width={carWidth} height={carHeight} />
        <Animated.View style={[styles.wheel, animatedStylesWheelLeft]}>
          <WheelSVG width={wheelSize} height={wheelSize} fill={'black'} />
        </Animated.View>
        <Animated.View style={[styles.wheel, animatedStylesWheelRight]}>
          <WheelSVG width={wheelSize} height={wheelSize} fill={'black'} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  car: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  wheel: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: wheelRadius,
    zIndex: 1,
  },
});
