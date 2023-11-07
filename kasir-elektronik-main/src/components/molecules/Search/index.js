import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors} from '../../../utils';
import {Button} from '../../atoms';

const Search = ({onChangeText, value}) => {
  return (
    <View
      style={{
        borderColor: colors.blue,
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
      }}>
      <TextInput
        placeholder="Search"
        style={{marginHorizontal: 16}}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
