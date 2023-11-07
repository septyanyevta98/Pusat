import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../utils';
import SmallButton from '../../atoms/SmallButton';
import ListCart from './ListCart';
import ListHistory from './ListHistory';
import NumberFormat from 'react-number-format';

const List = ({
  type,
  minus,
  plus,
  quantity,
  onPress,
  category,
  brand,
  name,
  stock,
  price,
  gambar,
  nama_produk,
  harga,
  jumlah,
  total,
  onPressDelete,
  onPressEdit,
  trx,
  tanggal,
  bayar,
  kembalian,
}) => {
  if (type === 'shop') {
    return (
      <ListCart
        nama_produk={nama_produk}
        harga={harga}
        jumlah={jumlah}
        total={total}
        onPressDelete={onPressDelete}
        onPressEdit={onPressEdit}
      />
    );
  }
  if (type === 'history') {
    return (
      <ListHistory
        trx={trx}
        tanggal={tanggal}
        bayar={bayar}
        kembalian={kembalian}
        onPress={onPress}
      />
    );
  }
  return (
    <View style={styles.content}>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text style={styles.text}>
            {category} - {brand} - {name}
          </Text>
          <Text style={styles.text}>Jumlah stock : {stock}</Text>
          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp '}
            renderText={(value) => (
              <Text style={styles.text}>Harga : {value}</Text>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: 'orange',
          margin: 5,
          padding: 5,
          borderRadius: 5,
          alignItems: 'center',
        }}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  text: {fontSize: 15, color: 'black'},
  content: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {fontSize: 15, color: colors.blue, fontWeight: 'bold'},
});
