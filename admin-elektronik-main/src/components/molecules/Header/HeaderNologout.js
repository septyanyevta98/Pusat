import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const HeaderNoLogout = ({onPress, type, title}) => {
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
    </View>
  );
};

export default HeaderNoLogout;

const styles = StyleSheet.create({});
