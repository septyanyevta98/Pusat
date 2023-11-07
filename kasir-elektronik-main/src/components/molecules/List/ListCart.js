import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../utils';
import NumberFormat from 'react-number-format';

const ListCart = ({
  nama_produk,
  harga,
  jumlah,
  total,
  onPressDelete,
  onPressEdit,
}) => {
  return (
    <View style={styles.content}>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.date}>{nama_produk}</Text>
        <NumberFormat
          value={harga}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp '}
          renderText={(value) => (
            <Text style={{fontSize: 13, color: 'black', flex: 1}}>{value}</Text>
          )}
        />

        <Text style={{fontSize: 13, color: 'black', marginHorizontal: 10}}>
          {jumlah}
        </Text>
        <NumberFormat
          value={total}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp '}
          renderText={(value) => (
            <Text style={{fontSize: 13, color: 'black', flex: 1}}>{value}</Text>
          )}
        />

        <View style={{}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              paddingVertical: 6,
              paddingHorizontal: 10,
              alignItems: 'center',
            }}
            onPress={onPressEdit}>
            <Text style={{color: 'white'}}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              paddingVertical: 6,
              paddingHorizontal: 10,
              alignItems: 'center',
            }}
            onPress={onPressDelete}>
            <Text style={{color: 'white'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListCart;

const styles = StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,

    marginBottom: 10,
  },
  date: {fontSize: 15, color: colors.blue, fontWeight: 'bold', flex: 1},
});
