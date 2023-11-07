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

          dispatch(
            setLoginState({
              ...userToken,
              token: userToken.token,
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
      // navigation.replace('IntroSlider');
      navigation.replace('Login');
    }, 12000);
  }, []);
  return (
    <>
      <View style={styles.content}>
        <Image
          source={Logo}
          style={{height: 200, width: 200, resizeMode: 'contain'}}
        />
      </View>
      <View style={{backgroundColor: 'white'}}>
        <Text
          style={{
            marginBottom: 20,
            color: 'gray',
            textAlign: 'center',
            backgroundColor: 'white',
          }}>
          by PT Pesona Solusi Indonesia
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
