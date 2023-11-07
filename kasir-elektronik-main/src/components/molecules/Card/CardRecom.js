import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Star} from '../../../assets';
import {colors} from '../../../utils';
const CardRecom = ({image, name_product}) => {
  return (
    <View
      style={{
        padding: 16,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 5,
        // flex: 1,
        // marginLeft: 16,
      }}>
      <Image
        source={image}
        style={{alignSelf: 'center', width: '100%', height: 150}}
      />
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: colors.blueDark,
          marginTop: 8,
        }}>
        {name_product}
      </Text>
      <View style={{marginTop: 4, marginBottom: 10}}>
        <Star />
      </View>
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

export default CardRecom;

const styles = StyleSheet.create({});
