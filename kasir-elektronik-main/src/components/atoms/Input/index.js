import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../../utils/colors';

const Input = ({icon, placeholder, onChangeText, value}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 8,
      }}>
      {icon}
      <TextInput
        placeholder={placeholder}
        style={{height: 40}}
        onChangeText={onChangeText}
        value={value}
        // blurOnSubmit={false}
        // autoFocus={false}
        // autoCorrect={false}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
