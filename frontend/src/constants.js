//Dòng này chỉ dành cho khi chưa cấu hình proxy trong package.json 
// export const BASE_URL = process.env.NODE_ENV === 'develeopment' ? 'http://localhost:5000' : '/';

export const BASE_URL = '' //Đã cấu hình proxy
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
