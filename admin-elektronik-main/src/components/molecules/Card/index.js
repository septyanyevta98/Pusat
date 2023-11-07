import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Product1} from '../../../assets';
import {colors} from '../../../utils';
import CardWarehouse from './CardWarehouse';
const Card = ({total_item, name, type}) => {
  if (type === 'warehouse') {
    return <CardWarehouse total_item={total_item} name={name} />;
  }
  return (
    <View
      style={{
        padding: 16,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 5,
        width: 141,
        marginLeft: 16,
      }}>
      <Image source={image} />
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: colors.blueDark,
          marginTop: 8,
        }}>
        {name_product}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          marginTop: 8,
          color: colors.blue,
        }}>
        $299,43
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '400',
            color: colors.gray,
            textDecorationLine: 'line-through',
          }}>
          $534,33
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: colors.red,
            marginLeft: 8,
          }}>
          24% Off
        </Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
