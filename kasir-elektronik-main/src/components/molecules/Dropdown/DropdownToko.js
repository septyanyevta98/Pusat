import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../../utils';
const Dropdown = ({toko, onChangeItem}) => {
  return (
    <View style={{}}>
      <DropDownPicker
        items={[
          {label: 'Cabang 1', value: 'Cabang1'},
          {label: 'Cabang 2', value: 'Cabang2'},
          {label: 'Cabang 3', value: 'Cabang 3'},
        ]}
        defaultValue={toko}
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
        placeholder="Pilih toko"
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
