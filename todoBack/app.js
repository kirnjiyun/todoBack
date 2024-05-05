const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const app = express();
app.use(bodyParser.json());
app.use("/api", indexRouter);
const mongoURI = `mongodb://localhost:27017/todo-demo`;
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {})
    .catch((err) => {
        console.log("DB connection fail", err);
    });
app.listen(3000, () => console.log("Server is running on port 3000"));
