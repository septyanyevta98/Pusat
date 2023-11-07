import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';

const ListBrand = ({onPressDelete, brand}) => {
  return (
    <View style={{marginVertical: 5}}>
      <View
        style={{
          padding: 10,
          backgroundColor: colors.border,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5 / 2,
        }}>
        <Text>{brand}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <TouchableOpacity
          onPress={onPressDelete}
          style={{
            backgroundColor: colors.red,
            flex: 1,
            padding: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListBrand;

const styles = StyleSheet.create({});
