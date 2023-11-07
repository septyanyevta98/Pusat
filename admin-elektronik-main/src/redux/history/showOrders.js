import axios from 'axios';
import * as conf from '../../config';
import {ProfitUrl} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBodyShowOrders = {
  store: '',
  month: '',
  year: '',
};

export let userToken = {
  token: '',
};

export const showOrder = (showOrderInput) => {
  const payload = showOrderInput['PayloadBodyShowOrders'];
  var bodyFormData = new FormData();
  bodyFormData.append('store', payload.store);
  bodyFormData.append('month', payload.month);
  bodyFormData.append('year', payload.year);

  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(ProfitUrl, {
      method: 'POST',
      headers: {
        ...header,
      },
      data: bodyFormData,
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        const response = res.data;
        console.log('respon show order', response);
        return response;
      })
      .catch((err) => {
        console.log('ShowOrders', err.response.data);
        Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
