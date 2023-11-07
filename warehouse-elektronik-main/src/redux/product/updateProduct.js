import {UpdateProductUrl} from '../../constans/Api';
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
  category: '',
  merk: '',
  name: '',
  price_buy: '',
  price_sell: '',
  stock: '',
  // image: '',
  sku: '',
};

export let userToken = {
  token: '',
};

export const editProduct = (registeInput) => {
  const payload = registeInput['PayloadBody'];
  var bodyFormData = new FormData();
  bodyFormData.append('id', payload.id);
  bodyFormData.append('store', payload.store);
  bodyFormData.append('category', payload.category);
  bodyFormData.append('merk', payload.merk);
  bodyFormData.append('name', payload.name);
  bodyFormData.append('price_buy', payload.price_buy);
  bodyFormData.append('price_sell', payload.price_sell);
  bodyFormData.append('stock', payload.stock);
  // bodyFormData.append('image', payload.image);
  bodyFormData.append('sku', payload.sku);

  var header = PayloadHeader.headers;
  header['Authorization'] = `Bearer ` + payload.userParam.token;
  return (dispatch) => {
    return axios(UpdateProductUrl, {
      method: 'POST',
      headers: {
        ...header,
      },
      data: bodyFormData,
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        const response = res.data;
        console.log(res);
        return response;
      })
      .catch((err) => {
        console.log('error dari udpate =>', err);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
