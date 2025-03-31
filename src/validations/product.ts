import { number, object, string } from 'yup';

const productName = string()
  .required('Product name is required.')
  .min(4, 'Product name should have at least 4 characters.')
  .max(20, 'Product name should have at most 20 characters.');

const productPrice = number()
  .required('Product price is required.')
  .positive('Product price must be a positive number.')
  .min(1, 'Product price must be at least 1.')
  .max(10000, 'Product price must not exceed 10,000.');

const productCategory = string()
  .required('Product category is required.')
  .min(3, 'Product category should have at least 3 characters.')
  .max(30, 'Product category should have at most 30 characters.');

const productStockStatus = string()
  .required('Stock status is required.')
  .oneOf(['in_stock', 'out_of_stock', 'pre_order'], 'Invalid stock status.');

const productSku = string()
  .required('SKU is required.')
  .min(3, 'SKU should have at least 3 characters.')
  .max(15, 'SKU should have at most 15 characters.');

const productDescription = string()
  .required('Product description is required.')
  .min(10, 'Description should have at least 10 characters.')
  .max(500, 'Description should have at most 500 characters.');

export const CreateProductRules = object().shape({
  name: productName,
  price: productPrice,
  category: productCategory,
  stockStatus: productStockStatus,
  sku: productSku,
  description: productDescription,
});