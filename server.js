import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import router from "./router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONG_URI = process.env.MONG_URI;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

mongoose
  .connect(MONG_URI)
  .then(
    app.listen(PORT, () => {
      console.log(
        `Connected to MongoDB Server & Listening on http://localhost:${PORT}/`
      );
    })
  )
  .catch((err) => {
    console.log(err);
  });

// Root Route
app.get("/", (req, res) => {
  return res.send("CometLabs - Assignment");
});

app.use("/api", router);
