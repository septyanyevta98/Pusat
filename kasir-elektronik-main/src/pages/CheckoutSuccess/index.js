import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, BackHandler} from 'react-native';
import {Button} from '../../components';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import NumberFormat from 'react-number-format';

const CheckoutSuccess = ({navigation, route}) => {
  const {
    code,
    date,
    bayar,
    kembalian,
    pdf,
    nama_produk,
    jumlah_produk,
  } = route.params;

  const printRemotePDF = async () => {
    await RNPrint.print({
      filePath: pdf,
    });
  };

  useEffect(() => {
    const backAction = () => {
      navigation.replace('MainApp');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 17,
      }}>
      <Text style={{textAlign: 'center', fontSize: 30, marginVertical: 20}}>
        Transaksi Berhasil
      </Text>
      <View style={styles.wrapperText}>
        <Text style={styles.text}>{code}</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.wrapperText}>
        <Text style={styles.text}>Nama Produk</Text>
        <Text style={styles.text}>{nama_produk}</Text>
      </View>
      <View style={styles.wrapperText}>
        <Text style={styles.text}>Jumlah</Text>
        <Text style={styles.text}>{jumlah_produk}</Text>
      </View>
      <View style={styles.wrapperText}>
        <Text>Total Bayar </Text>
        <NumberFormat
          value={bayar}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp '}
          renderText={(value) => <Text style={styles.text}>{value}</Text>}
        />
      </View>
      <View style={styles.wrapperText}>
        <Text>Total Kembalian </Text>
        <NumberFormat
          value={kembalian}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'Rp '}
          renderText={(value) => <Text style={styles.text}>{value}</Text>}
        />
      </View>
      {/* <Text style={styles.text}>{pdf}</Text> */}
      <View style={{marginTop: 10}}>
        <Button
          title="Kembali Home"
          onPress={() => navigation.replace('MainApp')}
        />
        <View marginTop={10} />
        <Button title="Download Bukti/Print" onPress={printRemotePDF} />
      </View>
    </View>
  );
};

export default CheckoutSuccess;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  wrapperText: {flexDirection: 'row', justifyContent: 'space-between'},
});
