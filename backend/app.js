require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const route = require("./routes/routes");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", route);

// server configs
const port = process.env.PORT || 6060;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
