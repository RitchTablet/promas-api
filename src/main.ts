import express, { Express } from "express";
import { config } from "dotenv";
import { myDataSource } from "./app-data-source";
import router from "@app-routes/core.routes";
import cors from "cors";

config();

const app: Express = express();

async function bootstrap() {
  app.use(cors({ origin: "*" }));
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.use("/api/v1", router);

  const port = process.env.PORT || 3001;

  myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is runnings at http://localhost:${port}`);
  });
}

bootstrap();
