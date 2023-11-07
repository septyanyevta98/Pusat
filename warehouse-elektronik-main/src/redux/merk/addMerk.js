import axios from 'axios';
import * as conf from '../../config';
import {AddBrandUrl} from '../../constans/Api';

export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  store: '',
  name: '',
};

export let userToken = {
  token: '',
};

export const addMerk = (registeInput) => {
  const payload = registeInput['PayloadBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('store', payload.store);
  bodyFormData.append('name', payload.name);

  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(AddBrandUrl, {
      method: 'POST',
      headers: {
        ...header,
      },
      data: bodyFormData,
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        const response = res.data;
        return response;
      })
      .catch((err) => {
        console.log('category ==>', err.data.response);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
