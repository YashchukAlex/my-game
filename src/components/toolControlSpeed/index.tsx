import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

export default ({ value, changeSpeed }) => {
  return (
    <View style={styles.container}>
      {speed.map((el, index) => (
        <TouchableWithoutFeedback
          onPress={() => changeSpeed(el.speed)}
          key={index}>
          <View style={[styles.cell, { backgroundColor: el.color }]} />
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 999,
    borderWidth: 1,
    borderColor: 'gray',
  },
  cell: {
    width: 20,
    height: 50,
  },
});

const speed = [
  { speed: 0, color: 'white' },
  { speed: 5000, color: '#4ea832' },
  { speed: 2500, color: '#a88d32' },
  { speed: 1000, color: '#a83232' },
];
