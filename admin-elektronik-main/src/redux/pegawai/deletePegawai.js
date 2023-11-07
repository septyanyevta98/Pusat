import axios from 'axios';
import * as conf from '../../config';
import {DeleteEmployee} from '../../constans/Api';
export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
  id: '',
};

export let userToken = {
  token: '',
};

export const deleteEmployee = (storeInput) => {
  const payload = storeInput['PayloadBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('id', payload.id);

  var header = PayloadHeader.headers;
  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(DeleteEmployee, {
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
