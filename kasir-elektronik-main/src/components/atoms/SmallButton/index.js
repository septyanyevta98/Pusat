import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../utils';
const SmallButton = ({symbol, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{symbol}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
