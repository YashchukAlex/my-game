import React from 'react';
import { Pressable, PressableProps } from 'react-native';

export default (props: PressableProps) => {
  const pressableOpacity = (pressed: Boolean) => [
    { opacity: pressed ? 0.5 : null },
    props.style,
  ];
  return (
    <Pressable {...props} style={({ pressed }) => pressableOpacity(pressed)}>
      {props.children}
    </Pressable>
  );
};
