import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils';
import HeaderMenu from './HeaderMenu';
const Header = ({title, type, onPress}) => {
  if (type === 'menu') {
    return <HeaderMenu onPress={onPress} />;
  }
  return (
    <View style={styles.content}>
      <Text style={{fontSize: 15}}>{title}</Text>
      {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginRight: 15}}>Logout</Text>
        <Icon name="log-in-outline" size={30} color={colors.blue} />
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height: 50,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
});
