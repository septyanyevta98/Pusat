import axios from 'axios';
import * as conf from '../../config';
import {GetProductUrl} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadGetProduct = {
  store: '',
  name: '',
};

export let userToken = {
  token: '',
};

export const callProduct = (showOrderInput) => {
  const payload = showOrderInput['PayloadGetProduct'];
  var bodyFormData = new FormData();
  bodyFormData.append('store', payload.store);
  bodyFormData.append('name', payload.name);

  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(GetProductUrl, {
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
        console.log('ShowOrders', err.response.data);
        Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
