import axios from 'axios';
import * as conf from '../../config';
import {Store} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let userToken = {
  token: '',
};

export const listStore = (inputListStore) => {
  const payload = inputListStore['userToken'];

  var header = PayloadHeader.headers;

  header['Authorization'] = `Bearer ` + payload.token;
  // console.log(header);
  return (dispatch) => {
    return axios(Store, {
      method: 'GET',
      headers: {
        ...header,
      },
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        const response = res.data;
        console.log('res');
        return response;
      })
      .catch((err) => {
        console.log('store ==>', err);
        return 'Some error occured, please retry';
      });
  };
};
