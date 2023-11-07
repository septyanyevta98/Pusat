import axios from 'axios';
import * as conf from '../../config';
import {AddStore} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  name: '',
  address: '',
};

export let userToken = {
  token: '',
};

export const addStore = (storeInput) => {
  const payload = storeInput['PayloadBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('name', payload.name);
  bodyFormData.append('address', payload.address);

  var header = PayloadHeader.headers;
  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(AddStore, {
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
        console.log('add store ==>', err.data.response);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
