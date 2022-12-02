import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const Fence = () => {
  const fullWidth = Dimensions.get('screen').width;
  const verticalLines = (fullWidth / 50).toFixed();

  return (
    <View style={styles.fenceContainer}>
      {Array.from({ length: verticalLines }).map((el, index) => (
        <View style={styles.verticalLine} key={index} />
      ))}
      {Array.from({ length: 2 }).map((el, index) => {
        const top = ++index * (styles.verticalLine.height / 3);
        return <View style={[styles.horizontalLine, { top }]} key={index} />;
      })}
    </View>
  );
};

export default () => {
  return (
    <View style={styles.container}>
      <Fence />
      <View style={styles.floor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  floor: {
    height: 10,
    backgroundColor: 'gray',
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
  },
  verticalLine: {
    height: 50,
    width: 3,
    backgroundColor: 'brown',
    //transform: [{ rotate: '10deg' }],
  },
});
