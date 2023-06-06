require("dotenv").config();
const responseHelper = require("express-response-helper").helper();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./app/models/index");

const app = express();

app.use(cors(corsOptions));
app.use(responseHelper);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("app/public"));

//Set app config
const title = process.env.TITLE;
const port = process.env.PORT;
const baseUrl = process.env.URL + port;

var corsOptions = {
  origin: "http://localhost:6000",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/route/route")(app);

db.sequelize.sync().then(() => {
  // create_roles();
  app.listen(port, () => console.log(title + " run on " + baseUrl));
});
