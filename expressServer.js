import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.listen(4000, function () {
  console.log(`Server is running on port ${4000} | http://localhost:4000`);
});