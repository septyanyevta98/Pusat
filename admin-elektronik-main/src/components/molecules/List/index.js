import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import ListCabang from './ListCabang';
import ListPegawai from './ListPegawai';
import ListWarehouse from './ListWarehouse';

const List = ({
  date,
  history,
  type,
  onPressDelete,
  onPressEdit,
  posisi,
  name,
  cabang,
  title,
  onPress,
  merk,
  profit,
  stock,
  store,
  alamat,
  total_sell,
  category,
}) => {
  if (type === 'cabang') {
    return (
      <ListCabang
        title={title}
        onPress={onPress}
        alamat={alamat}
        onPressEdit={onPressEdit}
      />
    );
  }
  if (type === 'pegawai') {
    return (
      <ListPegawai
        onPressDelete={onPressDelete}
        onPressEdit={onPressEdit}
        posisi={posisi}
        name={name}
        cabang={cabang}
      />
    );
  }
  if (type === 'warehouse') {
    return (
      <ListWarehouse
        category={category}
        name={name}
        merk={merk}
        profit={profit}
        stock={stock}
        store={store}
        total_sell={total_sell}
      />
    );
  }
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
        {date}
      </Text>
      <Text style={{fontSize: 15, color: 'black'}}>{history}</Text>
      {/* <Text style={{fontSize: 15, color: 'black'}}>Rp. 99.999,00</Text> */}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({});
