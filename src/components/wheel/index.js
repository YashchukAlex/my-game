import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import WheelSVG from '../../assets/wheel.svg';

const wheelRadius = 50;

export default ({ speed }) => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    if (rotation.value === 360) {
      rotation.value = 0;
      rotation.value = withTiming(360, {
        duration: speed,
        easing: Easing.linear,
      });
    }
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    stopAnimation();
    speed && startAnimation();
  }, [speed]);

  const startAnimation = () => {
    const val1 = speed / 360;
    rotation.value = withTiming(360, {
      duration: (360 - rotation.value) * val1,
      easing: Easing.linear,
    });
  };

  const stopAnimation = () => {
    cancelAnimation(rotation);
  };

  return (
    <TouchableWithoutFeedback onPress={startAnimation}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <WheelSVG
          width={wheelRadius * 2}
          height={wheelRadius * 2}
          fill={'black'}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: wheelRadius * 2,
    bottom: 10,
    zIndex: 999,
  },
});
