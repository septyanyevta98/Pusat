import axios from 'axios';
import * as conf from '../../config';
import {addCardUrl} from '../../constans/Api';

export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  product: '',
  qty: '',
  price_bargain: '',
};

export let userToken = {
  token: '',
};

export const addCard = (registeInput) => {
  const payload = registeInput['PayloadBody'];
  var bodyFormData = new FormData();

  bodyFormData.append('product', payload.product);
  bodyFormData.append('qty', payload.qty);
  bodyFormData.append('price_bargain', payload.price_bargain);
  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(addCardUrl, {
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
