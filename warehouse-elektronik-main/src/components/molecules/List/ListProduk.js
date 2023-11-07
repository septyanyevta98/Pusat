import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';

const ListProduk = () => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: colors.border,
        // justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 5 / 2,
        flexDirection: 'row',
      }}>
      <View
        style={{backgroundColor: 'grey', padding: 5, height: 50, width: 50}}>
        <Text>Image</Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text>Kategori - Brand</Text>
        <Text>List Produk</Text>
      </View>
    </View>
  );
};

export default ListProduk;

const styles = StyleSheet.create({});
