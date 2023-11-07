import {UpdateEmployee} from '../../constans/Api';
import {Alert} from 'react-native';
import axios from 'axios';
import * as conf from '../../config';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  id: '',
  name: '',
  email: '',
  username: '',
  level: '',
  password: '',
  re_password: '',
  store: '',
};

export let userToken = {
  token: '',
};

export const editEmployee = (registeInput) => {
  const payload = registeInput['PayloadBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('id', payload.id);
  bodyFormData.append('name', payload.name);
  bodyFormData.append('email', payload.email);
  bodyFormData.append('username', payload.username);
  bodyFormData.append('level', payload.level);
  bodyFormData.append('password', payload.password);
  bodyFormData.append('re_password', payload.re_password);
  bodyFormData.append('store', payload.store);

  var header = PayloadHeader.headers;
  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(UpdateEmployee, {
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
        return response;
      })
      .catch((err) => {
        console.log('register =>', err.data.response);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
