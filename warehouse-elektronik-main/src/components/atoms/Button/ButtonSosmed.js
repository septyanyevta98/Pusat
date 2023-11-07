import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/colors';
const ButtonSosmed = ({icon, title}) => {
  return (
    <View
      style={{
        borderColor: colors.border,
        borderWidth: 1,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      }}>
      {icon}
      <Text
        style={{
          textAlign: 'center',
          flex: 1,
          fontSize: 14,
          fontWeight: '700',
          color: colors.gray,
          borderRadius: 5,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default ButtonSosmed;

const styles = StyleSheet.create({});
