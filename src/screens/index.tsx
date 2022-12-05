import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Floor from '../components/floor/index';
import Wheel from '../components/wheel';
import ToolControlSpeed from '../components/toolControlSpeed';

export default () => {
  const [speed, setSpeed] = useState<number>(0);
  return (
    <View style={styles.container}>
      <Wheel speed={speed} />
      <Floor />
      <ToolControlSpeed value={speed} changeSpeed={setSpeed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
