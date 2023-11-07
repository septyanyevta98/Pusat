import * as config from '../config';

export const BaseUrl = config.BASE_URL;

export const loginUrl = BaseUrl + '/auth/login';
export const logoutUrl = BaseUrl + '/auth/logout';
//category
export const GetCategoryUrl = BaseUrl + '/category';
export const AddCategoryUrl = BaseUrl + '/category/add';
export const UpdateCategoryUrl = BaseUrl + '/category/update';
export const DeleteCategory = BaseUrl + '/category/delete';
//brand
export const GetBrandUrl = BaseUrl + '/merk';
export const AddBrandUrl = BaseUrl + '/merk/add';
export const UpdateBrandUrl = BaseUrl + '/merk/update';
export const DeleteBrandUrl = BaseUrl + '/merk/delete';
//product
export const GetProductUrl = BaseUrl + '/product';
export const AddProductUrl = BaseUrl + '/product/add';
export const UpdateProductUrl = BaseUrl + '/product/update';
export const DeleteProductUrl = BaseUrl + '/product/delete';
export const EditProductUrl = BaseUrl + '/product/edit';
//profile
export const GetProfile = BaseUrl + '/user';
export const ChangePassword = BaseUrl + '/user/update';
