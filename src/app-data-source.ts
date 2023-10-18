import { DataSource } from "typeorm"
import {config} from 'dotenv';

config();

export const myDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.PORT_DB, 10),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ["dist/entity/*.js"],
    logging: true,
    synchronize: true,
});