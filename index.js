const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ["http://localhost:8080", "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  }
}
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Just a server in express");
});

app.get("/new-route", (req, res) => {
  res.send("Hi, I'm a new route");
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log("My port" + port);
});
//docker-compose exec postgres bash
//psql -h localhost -d my_Store -U Nicolasito

//Object Relational Model
