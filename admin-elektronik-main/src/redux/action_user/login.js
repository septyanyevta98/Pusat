import * as t from '../actionTypes';
import {LoginUrl} from '../../constans/Api';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import * as conf from '../../config';
export const PayloadLoginHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadLoginBody = {
  email: '',
  password: '',
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

export const login = (loginInput) => {
  const payload = loginInput['PayloadLoginBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('email', payload.email);
  bodyFormData.append('password', payload.password);

  var header = PayloadLoginHeader.headers;

  return (dispatch) => {
    return axios(LoginUrl, {
      method: 'POST',
      headers: {
        ...header,
      },
      data: bodyFormData,
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        const response = res.data;
        console.log(response);

        if (response.code === 200) {
          console.log(response.code);
          const o = {
            ...response,
            token: response.data.token,
          };
          setLoginLocal(o);
          dispatch(
            setLoginState({
              ...response,
              token: response.data.token,
            }),
          );
        } else {
          Alert.alert('Error', response);
        }
        return response;
      })
      .catch((err) => {
        console.log('error login ==> ', err.response.data);
        return 'Some error occured, please retry';
      });
  };
};
