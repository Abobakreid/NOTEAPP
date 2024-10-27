/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <Pressable
      onPress={props.onclickfunction}
      style={({pressed}) => [
        {backgroundColor: pressed ? '#CCC' : props.backColor},
        styles.button,
        {...props.style},
      ]}>
      <Text
        style={[
          {letterSpacing: 4},
          {textAlign: props.textPosition},
          {fontSize: 16},
          {color: props.color},
        ]}>
        {props.title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default CustomButton;
