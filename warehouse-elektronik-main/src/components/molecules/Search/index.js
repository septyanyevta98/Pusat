import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors} from '../../../utils';
import {Button} from '../../atoms';

const Search = ({onChangeText, value}) => {
  return (
    <View style={{borderColor: colors.border, borderWidth: 1, borderRadius: 5}}>
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
