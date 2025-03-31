import { createProductController, deleteProductController, getProductController, updateProductController } from '@/controller/product.controller';
import { Router } from 'express';

const productRoutes = Router();

productRoutes.route('/').get(getProductController).post(createProductController);
productRoutes.route('/:id').get(getProductController).put(updateProductController).delete(deleteProductController);

export default productRoutes;