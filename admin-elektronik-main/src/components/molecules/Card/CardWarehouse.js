import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Star} from '../../../assets';
import {colors} from '../../../utils';
const CardWarehouse = ({total_item, name}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.blue,
        margin: 4,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{total_item}</Text>
      <Text>{name}</Text>
    </View>
  );
};

export default CardWarehouse;

const styles = StyleSheet.create({});
