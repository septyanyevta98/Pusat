import axios from 'axios';
import * as conf from '../../config';
import {CompleteCredit} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let payloadBodyKredit = {
  id: '',
};

export let userToken = {
  token: '',
};

export const completeCredit = (creditInput) => {
  const payload = creditInput['payloadBodyKredit'];
  var bodyFormData = new FormData();
  bodyFormData.append('id', payload.id);

  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(CompleteCredit, {
      method: 'POST',
      headers: {
        ...header,
      },
      data: bodyFormData,
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        const response = res.data;
        // console.log('respon show order', response);
        return response;
      })
      .catch((err) => {
        // console.log('ShowOrders', err.response.data);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
