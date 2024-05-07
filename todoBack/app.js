const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();
require("dotenv").config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("MMM", MONGODB_URI_PROD);

// CORS 미들웨어를 먼저 적용
app.use(cors());

// 그 다음 바디 파서
app.use(bodyParser.json());

// 그리고 API 라우터
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.log("DB connection fail", err);
    });

app.listen(3000, () => console.log("Server is running on port 3000"));
