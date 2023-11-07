import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
const Category = ({icon, title}) => {
  return (
    <View
      style={{
        width: 70,
        height: 108,
        marginHorizontal: 6,
      }}>
      <View
        style={{
          width: 70,
          height: 70,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 70 / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon}
      </View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '400',
          color: colors.gray,
          textAlign: 'center',
          marginTop: 8,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
