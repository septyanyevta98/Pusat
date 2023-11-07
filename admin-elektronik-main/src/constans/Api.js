import * as config from '../config';
export const BaseUrl = config.BASE_URL;

export const LoginUrl = BaseUrl + '/auth/login';
export const LogoutUrl = BaseUrl + '/auth/logout';
//employee
export const Employee = BaseUrl + '/employee';
export const AddEmployee = BaseUrl + '/employee/add';
export const UpdateEmployee = BaseUrl + '/employee/update';
export const DeleteEmployee = BaseUrl + '/employee/delete';

//store
export const Store = BaseUrl + '/store';
export const AddStore = BaseUrl + '/store/add';
export const DeleteStore = BaseUrl + '/store/delete';
export const UpdateStore = BaseUrl + '/store/update';
//product
export const GetProductUrl = BaseUrl + '/product/sell';
export const ProfitUrl = BaseUrl + '/product/profit';
//log
export const GetLogUrl = BaseUrl + '/log';
//update password
export const ChangePassword = BaseUrl + '/user/update';
//kredit
export const ListCredit = BaseUrl + '/transaction/credit';
export const CompleteCredit = BaseUrl + '/transaction/complete';
