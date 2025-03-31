import { Sequelize } from "sequelize";
import logger from "./logger";
import { envConfig } from "@/config/env.config";

export const sequelize: Sequelize = new Sequelize(envConfig.DB_DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      multipleStatements: true
    }
});

export async function databaseConnect(): Promise<void> {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        logger.info('Postgres database connection has been established succesfuly.')
    } catch (error) {
        logger.error('Unable to connect to database.', error);
    }
}