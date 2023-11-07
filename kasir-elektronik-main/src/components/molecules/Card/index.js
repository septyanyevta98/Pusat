import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Product1} from '../../../assets';
import {colors} from '../../../utils';
import CardRecom from './CardRecom';
const Card = ({image, name_product, type, onPress}) => {
  if (type === 'recom') {
    return <CardRecom image={image} name_product={name_product} />;
  }
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 5,
        // width: 141,
        flexDirection: 'row',
        marginBottom: 10,
        // marginLeft: 16,
      }}
      onPress={onPress}>
      <Image source={image} style={{height: 80, width: 80, borderRadius: 5}} />
      <Text
        style={{
          marginLeft: 10,
          fontSize: 20,
          fontWeight: '700',
          color: colors.blueDark,
          marginTop: 8,
        }}>
        {name_product}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({});
