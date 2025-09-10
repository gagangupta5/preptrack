import "reflect-metadata";
import { DataSource } from "typeorm";
import { Track } from "../model/Track";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "2310",
  database: "preptrack",
  synchronize: true,
  logging: false,
  entities: [Track],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async () => {
  if (PostgresDataSource.isInitialized) return PostgresDataSource;
  return PostgresDataSource.initialize();
};
