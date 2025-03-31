import express, { Express } from 'express';
import { databaseConnect } from './server/database';
import BusinessProductManagementServer from './server';
const initializeApp = (): void => {
    const app: Express = express();
    const productManagementServer = new BusinessProductManagementServer(app);
    databaseConnect().then(()=>{
      productManagementServer.start();
    });
}

initializeApp();