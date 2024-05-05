const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const mongoURI = `mongodb://localhost:27017/todo-demo`;
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {})
    .catch((err) => {
        console.log("DB connection fail", err);
    });
app.listen(123, () => {
    console.log("server is on 123");
});
