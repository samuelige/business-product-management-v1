import errorHandlerMiddleware from '@/middleware/errorHandler';
import notFound from '@/middleware/notFound';
import { Express } from 'express';
import productRoutes from './product.route';

export const setupRoutes = (app: Express) => {
    app.use('/api/v1/product', productRoutes);
    app.use(notFound);
    app.use(errorHandlerMiddleware);
};