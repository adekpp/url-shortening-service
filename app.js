import express from "express";
import connectDB from "./config/db.js";
import urlsRouter from "./routes/urls.js";
import indexRouter from "./routes/index.js";
const app = express();

const PORT = 3333;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/shorten", urlsRouter);
app.use("/", indexRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});
