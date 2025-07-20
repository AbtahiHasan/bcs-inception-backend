import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";

import cors from "cors";

import config from "./config";
import { not_found } from "./app/middlewares/not-found";
import { global_error_handler } from "./app/middlewares/global-error-handler";
import router from "./app/routes";

export const app: Application = express();

// cors

const origins = JSON.parse(JSON.stringify(config.origin)).split(",");
console.log("origin", origins);
app.use(
  cors({
    origin: origins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
//parsers

if (config.env === "development") app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// application routes

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "health is good",
  });
});
app.use(`/api/${config.api_version}`, router);

app.use(global_error_handler);

//Not Found
app.use(not_found);
