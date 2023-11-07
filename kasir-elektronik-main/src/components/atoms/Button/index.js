import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils/colors';
import ButtonSosmed from './ButtonSosmed';
import ButtonCancel from './ButtonCancel';
const Button = ({type, icon, title, onPress}) => {
  if (type === 'sosmed') {
    return <ButtonSosmed icon={icon} title={title} />;
  }
  if (type === 'cancel') {
    return <ButtonCancel icon={icon} title={title} onPress={onPress} />;
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
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
