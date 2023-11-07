import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderBack, Button, Input, List} from '../../components';
import {colors} from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
const DetailItem = ({title, navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBack
        onPress={() => navigation.navigate('MainApp', {screen: 'ListItem'})}
        title="Input produk"
      />
      <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 17}}>
        <View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Icon name="ios-aperture" size={60} color={colors.blue} />
            <Text>Change Image</Text>
          </TouchableOpacity>
          <Input placeholder="Masukkan Kategori" />
          <Input placeholder="Masukkan Brand" />
          <Input placeholder="Masukkan Produk" />
          {/* <Button title="Edit produk" /> */}
        </View>
        {/* <ScrollView>
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
          <List type="produk" />
        </ScrollView> */}
      </View>
    </View>
  );
};

export default DetailItem;

const styles = StyleSheet.create({});
