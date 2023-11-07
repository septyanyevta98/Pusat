import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';

const ListCabang = ({title, onPress, alamat, onPressEdit}) => {
  return (
    <View
      style={{
        borderColor: colors.blue,
        elevation: 1,
        backgroundColor: 'white',

        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
      }}>
      <View style={{flex: 1, padding: 10}}>
        <Text style={{}}>{title}</Text>
        <Text style={{}}>{alamat}</Text>
      </View>
      <View style={{}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            borderTopRightRadius: 10,
          }}
          onPress={onPressEdit}>
          <Text style={{color: 'white', padding: 10}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderBottomRightRadius: 10,
          }}
          onPress={onPress}>
          <Text style={{color: 'white', padding: 10}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListCabang;

const styles = StyleSheet.create({});
