import { config } from "dotenv";

config();

export const RDS_HOSTNAME = process.env.RDS_HOSTNAME;
export const RDS_PORT = process.env.RDS_PORT;
export const RDS_DB_NAME = process.env.RDS_DB_NAME;
export const RDS_USERNAME = process.env.RDS_USERNAME;
export const RDS_PASSWORD = process.env.RDS_PASSWORD;

export const PORT = process.env.PORT || 3000;