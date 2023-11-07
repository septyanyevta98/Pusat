import axios from 'axios';
import * as conf from '../../config';
import {GetProfile} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let userToken = {
  token: '',
};

export const getProfile = (inputListEmployee) => {
  const payload = inputListEmployee['userToken'];

  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.token;
  // console.log(header);
  return (dispatch) => {
    return axios(GetProfile, {
      method: 'GET',
      headers: {
        ...header,
      },
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        const response = res.data;
        return response;
      })
      .catch((err) => {
        console.log('ShowOrders', err);
        return 'Some error occured, please retry';
      });
  };
};
