import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {Logo} from '../../assets';
import * as t from '../../redux/actionTypes';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();

  let userToken = {
    token: '',
    storeID: '',
  };

  const setLoginState = (loginData) => {
    return {
      type: t.SET_LOGIN_STATE,
      payload: loginData,
    };
  };

  const setLoginLocal = async () => {
    try {
      await AsyncStorage.getItem('loginData', (error, result) => {
        if (result) {
          let resultParsed = JSON.parse(result);
          userToken.token = resultParsed.token;
          userToken.storeID = resultParsed.storeID;
          dispatch(
            setLoginState({
              ...userToken,
              token: userToken.token,
              storeID: userToken.storeID,
            }),
          );
        }
      });
    } catch (err) {
      // console.log(err);
    }
  };
  const setDeviceInfoState = (deviceData) => {
    return {
      type: t.SET_DEVICEINFO_STATE,
      payload: deviceData,
    };
  };

  useEffect(() => {
    setLoginLocal();
    setTimeout(() => {
      if (userToken.token !== '') {
        navigation.replace('MainApp');
        // navigation.replace('LogActivity');
        return;
      }
      navigation.replace('Login');
    }, 12000);
  }, []);

  return (
    <>
      <View style={styles.content}>
        <Image
          source={Logo}
          style={{height: 120, width: '100%', resizeMode: 'contain'}}
        />
      </View>
      <View style={{paddingBottom: 20, backgroundColor: 'white'}}>
        <Text style={{color: 'gray', textAlign: 'center'}}>
          By PT Pesona Solusi Indonesia
        </Text>
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
