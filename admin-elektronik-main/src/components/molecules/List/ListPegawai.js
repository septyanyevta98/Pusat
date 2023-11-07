import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';
const ListPegawai = ({onPressEdit, onPressDelete, posisi, name, cabang}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 1,
      }}>
      <View style={{flex: 1, margin: 13}}>
        <Text style={{fontSize: 15}}>
          {posisi} - {name}
        </Text>
        <Text style={{fontSize: 15}}>{cabang}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={onPressEdit}
          style={{
            backgroundColor: colors.blue,
            flex: 1,
            padding: 6,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressDelete}
          style={{
            backgroundColor: 'red',
            flex: 1,
            padding: 6,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomRightRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListPegawai;

const styles = StyleSheet.create({});
