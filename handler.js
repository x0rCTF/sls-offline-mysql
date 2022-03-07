"use strict";

const mysql = require("mysql");

module.exports.hello = async (event) => {
  if (process.env.IS_OFFLINE) {
    const pools = mysql.createPool({
      connectionLimit: 100, //important
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
      host: "localhost",
      user: "aaaa",
      password: "password",
      database: "mentorship",
      debug: false,
    });

    await pools.query(
      `INSERT INTO mentorship.WeatherApp (messageId, City, Country, Description, Temperature, Temp_min, Temp_max) VALUES ('adadaff3r3sf', 'Kumanovo', 'MK', 'Sunny', 4, 1, 8);`,
      function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        // rows fetch
        console.log(data);
        console.log("Data forwarded");
      }
    );
  } else {
    const note = event.Records[0].body;
    console.log(event.Records[0]);
    console.log(note);
    const messageId = event.Records[0].messageId;
    console.log(messageId);
    const message = JSON.parse(event.Records[0].body);
    const city = message.name.toString();
    const country = message.sys.country.toString();
    const description = message.weather[0].description.toString();
    const temp = parseInt(message.main.temp.toFixed(0));
    const temp_min = parseInt(message.main.temp_min.toFixed(0));
    const temp_max = parseInt(message.main.temp_max.toFixed(0));

    console.log(message);

    const pool = mysql.createPool({
      connectionLimit: 100, //important
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
      host: "masterdb.cqnfhoewhffm.us-east-1.rds.amazonaws.com",
      user: "root",
      password: "supersecretpass",
      database: "mentorship",
      debug: false,
    });

    await pool.query(
      `INSERT INTO mentorship.WeatherApp (messageId, City, Country, Description, Temperature, Temp_min, Temp_max) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [messageId, city, country, description, temp, temp_min, temp_max],
      function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        // rows fetch
        console.log(data);
      }
    );
  }
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "SQS Lambda Trigger",
        input: event,
      },
      null,
      2
    ),
  };
};