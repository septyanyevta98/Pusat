import axios from 'axios';
import * as conf from '../../config';
import {getProductUrl} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let ProductBody = {
  category: '',
};

export let userToken = {
  token: '',
};

export const getProduct = (storeInput) => {
  const payload = storeInput['ProductBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('category', payload.category);

  var header = PayloadHeader.headers;
  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(getProductUrl, {
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
        console.log('delete store ==>', err.data.response);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
