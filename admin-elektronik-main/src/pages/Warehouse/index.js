import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Header, List, Button, Card} from '../../components';
import Search from '../../components/molecules/Search';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../utils';
const Warehouse = ({navigation}) => {
  const [toko, setToko] = useState('1');
  const [search, setSearch] = useState('');

  const FunctionSearch = (input) => {
    setSearch(input);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        type="menu"
        title="INFO WAREHOUSE"
        onPress={() => navigation.goBack('')}
      />

      <View style={{marginHorizontal: 16, flex: 1}}>
        <Search onChangeText={FunctionSearch} value={search} />
        <View height={10} />
        <DropDownPicker
          items={[
            {label: 'Semua Cabang', value: '0'},
            {label: 'Tayu', value: '1'},
            {label: 'Kudus', value: '2'},
          ]}
          defaultValue={toko}
          containerStyle={styles.containerDropdown}
          style={styles.dropdownStyle}
          itemStyle={{justifyContent: 'flex-start'}}
          placeholder="Pilih toko"
          dropDownStyle={{backgroundColor: 'white'}}
          labelStyle={styles.dropdownLabel}
          onChangeItem={(item) => setToko(item.value)}
        />

        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Card type="warehouse" name="Kategori" total_item="10" />
          <Card type="warehouse" name="brand" total_item="10" />
          <Card type="warehouse" name="item" total_item="10" />
        </View>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
          <List type="warehouse" />
        </ScrollView>
      </View>
    </View>
  );
};

export default Warehouse;

const styles = StyleSheet.create({
  dropdownWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  dropdownContent: {flex: 1, padding: 4},
  titleDropdown: {textAlign: 'center', marginBottom: 3},
  containerDropdown: {
    height: 40,
    borderRadius: 10,
  },
  dropdownStyle: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: colors.border,
  },
  dropdownLabel: {
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
  },
});
