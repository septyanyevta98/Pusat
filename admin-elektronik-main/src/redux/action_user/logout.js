import * as t from '../actionTypes';
import {LogoutUrl} from '../../constans/Api';
import {Alert} from 'react-native';
import axios from 'axios';
import * as conf from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
export const PayloadLoginHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  token: '',
};

const setLoginState = (loginData) => {
  return {
    type: t.SET_LOGIN_STATE,
    payload: loginData,
  };
};

const setLoginLocal = async (loginData) => {
  try {
    await AsyncStorage.setItem('loginData', JSON.stringify(loginData));
  } catch (err) {
    console.log('error set Login Local ', err);
  }
};

export const logout = (logoutInput) => {
  const payload = logoutInput['PayloadBody'];
  var header = PayloadLoginHeader.headers;
  header['Authorization'] = `Bearer ` + payload.token;
  // console.log('header logout?', header);
  return (dispatch) => {
    return axios(LogoutUrl, {
      method: 'POST',
      headers: {
        ...header,
      },
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        console.log('respon logout', res.data);
        const response = res.data;
        if (response.code === 200) {
          const o = {
            ...response,
            token: '',
          };
          setLoginLocal(o);
          dispatch(
            setLoginState({
              ...response,
              token: '',
            }),
          );
        } else {
          Alert.alert('Error', response);
        }
        return response;
      })
      .catch((err) => {
        console.log('error logout ==> ', err.response.data);
        return 'Some error occured, please retry';
      });
  };
};
