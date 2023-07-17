//Database connection

var mysql = require("mysql2");
// We can use express as shown as below
const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "geoserver_regions",
});

con.connect(function (err) {
  app.get("/getMapIndexes", (req, res) => {
    let id = req.query.id.toString();
    if (err) throw err;
    con.query(
      `SELECT * FROM municipalities WHERE MUNICIPALI=${id}`,
      function (err, result) {
        if (err) throw err;
        else {
          res.send(result);
        }
      }
    );
  });

  app.get("/getMunicipalName", (req, res) => {
    let id = req.query.id.toString();
    if (err) throw err;
    con.query(
      `SELECT Name, NameEN FROM municipalities WHERE MUNICIPALI=${id}`,
      function (err, result) {
        if (err) throw err;
        else {
          res.send(result);
        }
      }
    );
  });

  app.get("/regions", (req, res) => {
    let lang = req.query.lang;
    console.log(lang);
    if (err) throw err;
    con.query(
      `SELECT * FROM ${
        lang === "ka" ? "regional_statistics" : "regional_statistics_en"
      }`,
      function (err, result) {
        if (err) throw err;
        else {
          console.log(result);
          res.send(result);
        }
      }
    );
  });

  app.get("/municipal", (req, res) => {
    let lang = req.query.lang;
    console.log(lang);
    if (err) throw err;
    con.query(
      `SELECT * FROM ${
        lang === "ka" ? "municipal_statistics" : "municipal_statistics_en"
      }`,
      function (err, result) {
        if (err) throw err;
        else {
          console.log(result);
          res.send(result);
        }
      }
    );
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
