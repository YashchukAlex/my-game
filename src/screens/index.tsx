import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Floor from '../components/floor/index';
import Wheel from '../components/wheel';
import ToolControlSpeed from '../components/toolControlSpeed';

export default () => {
  const [speed, setSpeed] = useState<number>(0);
  const mapMoving = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -mapMoving.value,
        },
      ],
    };
  }, [mapMoving]);

  return (
    <>
      <ToolControlSpeed value={speed} changeSpeed={setSpeed} />
      <Animated.View style={[styles.container, animatedStyles]}>
        <Wheel speed={speed} mapMoving={mapMoving} />
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
