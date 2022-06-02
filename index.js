const express = require("express");
const cors = require('cors');
const {routerApi} = require("./routes");

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = 3011;

app.use(express.json());

const whitelist = ["http://localhost:3011", "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not!!!"), false);
    }
  }
}
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Hi, I'm a server in express");
});


routerApi(app);

app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log("My port: " + port);
});
