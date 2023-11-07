import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Logo} from '../../../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils';
import HeaderBack from './HeaderBack';
const Header = (type) => {
  if (type === 'back') {
    return <HeaderBack />;
  }
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        height: 60,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Image source={Logo} style={{height: 40, resizeMode: 'contain'}} /> */}
        <Text style={{fontSize: 20, marginLeft: 10}}>WAREHOUSE APP</Text>
      </View>
      {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginRight: 10, fontWeight: 'bold'}}>Logout</Text>
        <Icon name="log-in-outline" size={30} color={colors.blue} />
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
