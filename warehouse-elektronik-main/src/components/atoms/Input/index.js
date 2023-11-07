import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../../utils/colors';
import {Message} from '../../../assets';
const Input = ({
  icon,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  maxLength,
}) => {
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
        style={{paddingHorizontal: 17, height: 40, flex: 1}}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
