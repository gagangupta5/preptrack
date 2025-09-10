import express, { Request, Response } from "express";
import { initializeDatabase } from "./config/Database";
import trackRouter from "./routes/TrackRoutes";

const app = express();
app.use(express.json());

const port: number = 5000;

app.use("/api/v1", trackRouter);

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port number ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
