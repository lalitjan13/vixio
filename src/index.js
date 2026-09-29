import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";

dotenv.config({
  path: "./.env",
});

const app = express();

(async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("DB CONNECTED, DB HOST: ", connectionInstance.connection.host);
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log("SERVER IS RUNNING ON PORT: ", process.env.PORT);
    });
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
})();
