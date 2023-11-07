import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
const ListWarehouse = ({
  category,
  name,
  merk,
  profit,
  stock,
  store,
  total_sell,
}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}>
      <Text style={{fontSize: 15, color: colors.blue, fontWeight: 'bold'}}>
        {category} / {merk} / {name}
      </Text>
      <Text style={{fontSize: 15, color: 'black'}}>Profit :{profit} </Text>
      <Text style={{fontSize: 15, color: 'black'}}>Store :{store} </Text>
      <Text style={{fontSize: 15, color: 'black'}}>Stock :{stock} </Text>
      <Text style={{fontSize: 15, color: 'black'}}>Terjual :{total_sell} </Text>
      {/* <Text style={{fontSize: 15, color: 'black'}}>Rp. 99.999,00</Text> */}
    </View>
  );
};

export default ListWarehouse;

const styles = StyleSheet.create({});
