import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../../utils';
import DropdownTahun from '../Dropdown/DropdownTahun';
import DropdownToko from '../Dropdown/DropdownToko';

const Dropdown = ({bulan, onChangeItem, type}) => {
  if (type === 'toko') {
    return <DropdownToko onChangeItem={onChangeItem} />;
  }
  if (type === 'tahun') {
    return <DropdownTahun onChangeItem={onChangeItem} />;
  }
  return (
    <View style={{}}>
      <DropDownPicker
        items={[
          {label: 'Januari', value: 'Januari'},
          {label: 'Februari', value: 'Februari'},
          {label: 'Maret', value: 'Maret'},
          {label: 'April', value: 'April'},
          {label: 'Mei', value: 'Mei'},
          {label: 'Juni', value: 'Juni'},
          {label: 'Juli', value: 'Juli'},
          {label: 'Agustus', value: 'Agustus'},
          {label: 'September', value: 'September'},
          {label: 'Oktober', value: 'Oktober'},
          {label: 'November', value: 'November'},
          {label: 'Desember', value: 'Desember'},
        ]}
        defaultValue={bulan}
        containerStyle={{
          height: 40,
          borderRadius: 10,
        }}
        style={{
          padding: 0,
          borderRadius: 10,
          backgroundColor: 'white',
          borderColor: colors.border,
        }}
        itemStyle={{justifyContent: 'flex-start'}}
        placeholder="Pilih Bulan"
        dropDownStyle={{backgroundColor: 'white'}}
        labelStyle={{
          fontSize: 12,
          textAlign: 'left',
          color: 'black',
        }}
        onChangeItem={onChangeItem}
        // onChangeItem={item => console.log(item.label, item.value)}
        // dropDownMaxHeight={200}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
