import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils';
const HeaderBack = ({title, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}>
        <Icon name="ios-arrow-back-outline" size={30} color={colors.blue} />
      </TouchableOpacity>
      <Text style={{marginLeft: 10, fontSize: 15}}>{title}</Text>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({});
