import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../utils';
import NumberFormat from 'react-number-format';

const ListKredit = ({
  kode_transaksi,
  date,
  store,
  nama_barang,
  jumlah_dp,
  sisa_pembayaran,
  onPress,
  status,
}) => {
  if (status === 1) {
    return (
      <View
        style={{
          marginVertical: 4,
          marginHorizontal: 17,
          borderRadius: 10,
          padding: 5,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
          backgroundColor: colors.blue,
        }}
        onPress={onPress}
        activeOpacity={0.7}>
        <View style={styles.wrapText}>
          <Text style={{fontSize: 12}}>{kode_transaksi} - Lunas</Text>
          <Text style={{fontSize: 12}}>{date}</Text>
        </View>
        <View style={styles.wrapText}>
          <Text style={{fontSize: 12}}>{store}</Text>
          <Text style={{fontSize: 12}}>{nama_barang}</Text>
        </View>
        <View style={styles.wrapText}>
          <NumberFormat
            value={jumlah_dp}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp '}
            renderText={(value) => (
              <Text style={{fontSize: 12}}>Down Payment : {value}</Text>
            )}
          />
          <NumberFormat
            value={sisa_pembayaran}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp '}
            renderText={(value) => (
              <Text style={{fontSize: 12}}>Sisa: {value}</Text>
            )}
          />
        </View>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={{
        marginVertical: 4,
        marginHorizontal: 17,
        borderRadius: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: 'white',
      }}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.wrapText}>
        <Text style={{fontSize: 12}}>{kode_transaksi} - Belum Lunas</Text>
        <Text style={{fontSize: 12}}>{date}</Text>
      </View>
      <View style={styles.wrapText}>
        <Text style={{fontSize: 12}}>{store}</Text>
        <Text style={{fontSize: 12}}>{nama_barang}</Text>
      </View>
      <View style={styles.wrapText}>
        <NumberFormat
          value={jumlah_dp}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp '}
          renderText={(value) => (
            <Text style={{fontSize: 12}}>Down Payment : {value}</Text>
          )}
        />
        <NumberFormat
          value={sisa_pembayaran}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp '}
          renderText={(value) => (
            <Text style={{fontSize: 12}}>Sisa: {value}</Text>
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListKredit;

const styles = StyleSheet.create({
  wrapText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
