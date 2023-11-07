import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Logo} from '../../../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils';
import HeaderMenu from './HeaderMenu';
const Header = ({onPress, type, title}) => {
  if (type === 'menu') {
    return <HeaderMenu title={title} onPress={onPress} />;
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
        {/* <Image source={Logo} style={{height: 50, width: 50}} /> */}
        <Text style={{fontSize: 20, marginLeft: 10}}>Admin App</Text>
      </View>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={onPress}>
        <Text style={{marginRight: 10, fontWeight: 'bold'}}>Logout</Text>
        <Icon name="log-in-outline" size={30} color={colors.blue} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
