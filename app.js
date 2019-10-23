const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.Promise = global.Promise;
const db = require("./configuration/index").mongoURI;

const app = express();
app.use(cors());

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

mongoose
  .connect(db)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/users", require("./routes/users"));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening at ${port}`));
