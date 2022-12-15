import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { mapSize, roadHeight } from '../../constants';

import { generateBackground } from '../../helpers/UIGenerators';

const Fence = () => {
  let fullWidth = mapSize;
  const verticalLines = (fullWidth / 50).toFixed();

  const uiDecorations = useMemo(() => {
    return generateBackground(mapSize);
  }, []);

  return (
    <View style={styles.fenceContainer}>
      {Array.from({ length: verticalLines }).map((el, index) => (
        <View style={styles.verticalLine} key={index} />
      ))}
      {Array.from({ length: 2 }).map((el, index) => {
        const top = ++index * (styles.verticalLine.height / 3);
        return <View style={[styles.horizontalLine, { top }]} key={index} />;
      })}
      {uiDecorations.map((el, index) => {
        return (
          <View
            style={[styles.uiElementBackground, { left: el.x }]}
            key={index}>
            <el.Icon
              key={index}
              width={el.width}
              height={el.height}
              fill="black"
            />
          </View>
        );
      })}
    </View>
  );
};

export default () => {
  return (
    <View style={styles.container}>
      <Fence />
      <View style={styles.road} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: mapSize,
    position: 'absolute',
    bottom: 0,
  },
  road: {
    height: roadHeight,
    backgroundColor: 'gray',
    zIndex: 999,
  },
  //Fence
  fenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalLine: {
    height: 1.5,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'brown',
    zIndex: 10,
  },
  verticalLine: {
    height: 50,
    width: 3,
    backgroundColor: 'brown',
    zIndex: 10,
    // transform: [{ rotate: '10deg' }],
  },
  uiElementBackground: {
    position: 'absolute',
    bottom: -50,
    backgroundColor: 'transparent',
  },
});
