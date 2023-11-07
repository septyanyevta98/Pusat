import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils';

const HeaderMenu = ({onPress}) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="ios-arrow-back-outline" size={30} color={colors.blue} />
      </TouchableOpacity>
      {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginRight: 15}}>Logout</Text>
        <Icon name="log-in-outline" size={30} color={colors.blue} />
      </TouchableOpacity> */}
    </View>
  );
};

export default HeaderMenu;

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
