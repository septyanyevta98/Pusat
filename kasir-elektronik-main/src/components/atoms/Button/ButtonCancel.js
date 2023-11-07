import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils/colors';
const ButtonCancel = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCancel;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    marginVertical: 16,
  },
});
