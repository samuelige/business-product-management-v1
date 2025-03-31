import { Express, json, NextFunction, Request, Response, urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import logger from './logger';
import { setupRoutes } from '@/routes';
import { envConfig } from '@/config/env.config';

export default class BusinessProductManagementServer {
    private app: Express;
    private httpServer: http.Server;

    constructor(app: Express) {
        this.app = app;
        this.httpServer = new http.Server(app);
    }
    async start(): Promise<void> {
        this.standardMiddleware(this.app);
        setupRoutes(this.app);
        this.startServer();
    }

    private standardMiddleware(app: Express): void {
        app.set('trust proxy', 1);
        app.use((_req: Request, res: Response, next: NextFunction) => {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            next();
        });
        const corsOptions = {
          origin: [ envConfig.CLIENT_URL],
          credentials: true,
          methods: ['GET', 'POST', 'PUT', 'DELETE']
        };
        app.use(cors(corsOptions));
        app.use(json({ limit: '200mb' }));
        app.use(urlencoded({ extended: true, limit: '200mb' }));
    }

    private async startServer(): Promise<void> {
        try {
            const PORT = (envConfig.PORT as unknown) as string;
            const SERVER_PORT: number = parseInt(PORT!, 10) || 5000;
            logger.info(`Server has started with process id ${process.pid}`);
            this.httpServer.listen(SERVER_PORT, () => {
                logger.info(`Server running on port ${SERVER_PORT}`);
            });
        } catch (error) {
            logger.error('Error in startServer method:', error);
        }
    }
}