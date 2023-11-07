import * as config from '../config';

export const BaseUrl = config.BASE_URL;
//auth
export const loginUrl = BaseUrl + '/auth/login';
export const logoutUrl = BaseUrl + '/auth/logout';

//product
export const getProductUrl = BaseUrl + '/product';

//card
export const addCardUrl = BaseUrl + '/cart/add';
export const getCardUrl = BaseUrl + '/cart';
export const updateCardUrl = BaseUrl + '/cart/update';
export const deleteCardUrl = BaseUrl + '/cart/delete';
//transactions
export const addTransactionUrl = BaseUrl + '/transaction/add';
export const getTransactionUrl = BaseUrl + '/transaction/';
export const updateTransactionUrl = BaseUrl + '/transaction/update';
//category
export const GetCategoryUrl = BaseUrl + '/category';
//profile
export const GetProfile = BaseUrl + '/user';
