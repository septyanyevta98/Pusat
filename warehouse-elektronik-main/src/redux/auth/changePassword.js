import axios from 'axios';
import * as conf from '../../config';
import {ChangePassword} from '../../constans/Api';

export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  old_password: '',
  new_password: '',
  re_password: '',
};

export let userToken = {
  token: '',
};

export const changePassword = (registeInput) => {
  const payload = registeInput['PayloadBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('old_password', payload.old_password);
  bodyFormData.append('new_password', payload.new_password);
  bodyFormData.append('re_password', payload.re_password);
  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(ChangePassword, {
      method: 'POST',
      headers: {
        ...header,
      },
      data: bodyFormData,
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        // console.log('respon :', res);
        const response = res.data;
        return response;
      })
      .catch((err) => {
        // console.log('category ==>', err.response.data);
        // Alert.alert('Error', 'Some error occured, please retry');
        return err;
      });
  };
};
