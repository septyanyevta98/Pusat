import {UpdateCategoryUrl} from '../../constans/Api';
import {Alert} from 'react-native';
import axios from 'axios';
import * as conf from '../../config';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  id: '',
  store: '',
  name: '',
  image: '',
};

export let userToken = {
  token: '',
};

export const updateCategory = (registeInput) => {
  const payload = registeInput['PayloadBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('id', payload.id);
  bodyFormData.append('store', payload.store);
  bodyFormData.append('name', payload.name);
  bodyFormData.append('image', payload.image);

  var header = PayloadHeader.headers;
  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(UpdateCategoryUrl, {
      method: 'POST',
      headers: {
        ...header,
      },
      data: bodyFormData,
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        const response = res.data;
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log('register =>', err.data.response);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
