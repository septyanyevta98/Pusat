import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../../utils';
const Dropdown = ({tahun, onChangeItem}) => {
  return (
    <View style={{}}>
      <DropDownPicker
        items={[
          {label: '2021', value: '2021'},
          {label: '2022', value: '2022'},
          {label: '2023', value: '2023'},
          {label: '2024', value: '2024'},
          {label: '2025', value: '2025'},
        ]}
        defaultValue={tahun}
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
        placeholder="Pilih Tahun"
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
