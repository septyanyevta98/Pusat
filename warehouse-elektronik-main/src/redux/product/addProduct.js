import axios from 'axios';
import * as conf from '../../config';
import {AddProductUrl} from '../../constans/Api';

export const PayloadHeader = {
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
  },
};

export let PayloadBody = {
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

export const addMerk = (registeInput) => {
  const payload = registeInput['PayloadBody'];
  var bodyFormData = new FormData();
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
  console.log('url add product : ', AddProductUrl);
  header['Authorization'] = `Bearer ` + payload.userParam.token;
  // console.log('get url coy');
  return (dispatch) => {
    return axios(AddProductUrl, {
      method: 'POST',
      headers: {
        ...header,
      },
      data: bodyFormData,
      timeout: conf.TIMEOUT,
    })
      .then((res) => {
        console.log('ini respon add', res);
        const response = res.data;
        return response;
      })
      .catch((err) => {
        console.log('product ==>', err.data.response);
        // Alert.alert('Error', 'Some error occured, please retry');
        return 'Some error occured, please retry';
      });
  };
};
