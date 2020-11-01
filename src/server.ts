import express, { Application, Router } from "express";
import bodyParser from "body-parser";
const router = require("./routers/TodosRouter");
import pool from "./dbconfig/dbconnector";
const helmet = require("helmet");

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    // Sets "Content-Security-Policy: default-src 'self';script-src 'self' example.com;object-src 'none'"
    this.app.use(
      helmet.contentSecurityPolicy({
        directives: {
          "default-src": ["'self'"],
          "script-src": ["'self'", "example.com"],
          "object-src": ["'none'"],
          "img-src": ["'self'"],
        },
      })
    );
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
  }

  private dbConnect() {
    pool.connect(function (err, client, done) {
      if (err) throw new Error(err);
      console.log("Connected");
    });
  }

  private routerConfig() {
    // this.app.use("/todos", todosRouter);

    this.app.use(router);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

export default Server;
