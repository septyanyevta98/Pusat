import axios from 'axios';
import * as conf from '../../config';
import {addTransactionUrl} from '../../constans/Api';

export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  pay: '',
};

export let userToken = {
  token: '',
};

export const addTransaction = (registeInput) => {
  const payload = registeInput['PayloadBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('pay', payload.pay);
  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(addTransactionUrl, {
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
