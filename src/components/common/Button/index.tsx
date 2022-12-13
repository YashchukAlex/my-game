import React from 'react';
import { Pressable } from 'react-native';

export default (props: any) => {
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
