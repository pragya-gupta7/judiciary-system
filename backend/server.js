const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// view engine setup
const port = process.env.PORT || 5000;
// const seed = require('./seeding');
// const Exercise = require("./models/exercise.model");

const MONGODB_URL = "mongodb://127.0.0.1:27017/judiciary-information-system";
mongoose
  .connect(MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log("Something bad happened", e));


// const data = seed()
// Exercise.insertMany(data)
//   .then(docs => console.log(`${docs.length} users have been inserted into the database.`))
//   .catch(err => {
//     console.error(err);
//     console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
//   });

app.use("*", (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
