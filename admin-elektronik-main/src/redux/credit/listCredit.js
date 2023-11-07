import axios from 'axios';
import * as conf from '../../config';
import {ListCredit} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let payloadBodyGetKredit = {
  date_start: '',
  date_end: '',
};

export let userToken = {
  token: '',
};

export const getCredit = (storeInput) => {
  const payload = storeInput['payloadBodyGetKredit'];
  var bodyFormData = new FormData();
  bodyFormData.append('date_start', payload.date_start);
  bodyFormData.append('date_end', payload.date_end);

  var header = PayloadHeader.headers;
  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(ListCredit, {
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
        console.log('delete store ==>', err.response.data);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
