const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const JsonDB = require('node-json-db');

const config = require('./config.js');
const core = require('./core.js');

const app = express();
const db = new JsonDB("schedule", true, true);

app.use(express.static('public'));
app.use(bodyParser.json());


/* Set year week day if not exist */
try {
  db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}/startDate`);
  db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}/1`);
  db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}/2`);
  db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}/3`);
  db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}/4`);
  db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}/5`);
  db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}/6`);
  db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}/7`);
} catch(e) {
  db.push(`/${core.getYearNumber()}/${core.getWeekNumber()}/startDate`, "");
  db.push(`/${core.getYearNumber()}/${core.getWeekNumber()}/1`, []);
  db.push(`/${core.getYearNumber()}/${core.getWeekNumber()}/2`, []);
  db.push(`/${core.getYearNumber()}/${core.getWeekNumber()}/3`, []);
  db.push(`/${core.getYearNumber()}/${core.getWeekNumber()}/4`, []);
  db.push(`/${core.getYearNumber()}/${core.getWeekNumber()}/5`, []);
  db.push(`/${core.getYearNumber()}/${core.getWeekNumber()}/6`, []);
  db.push(`/${core.getYearNumber()}/${core.getWeekNumber()}/7`, []);
}


/* Get custom schedule */
app.get('/api/getSchedule/:year/:week', function (req, res) {
  let year = parseInt(req.params.year);
  let week = parseInt(req.params.week);

  if(isNaN(year)) {
    res.json({
      status: "error",
      message: "Year is not a valid number"
    });
  } else {
    if(isNaN(week)) {
      res.json({
        status: "error",
        message: "Week is not a valid number"
      });
    } else {
      try {
        let getScheduleData = db.getData(`/${parseInt(year)}/${parseInt(week)}`);
        res.json(getScheduleData);
      } catch(e) {
        db.push(`/${parseInt(year)}/${parseInt(week)}/startDate`, "");
        db.push(`/${parseInt(year)}/${parseInt(week)}/1`, []);
        db.push(`/${parseInt(year)}/${parseInt(week)}/2`, []);
        db.push(`/${parseInt(year)}/${parseInt(week)}/3`, []);
        db.push(`/${parseInt(year)}/${parseInt(week)}/4`, []);
        db.push(`/${parseInt(year)}/${parseInt(week)}/5`, []);
        db.push(`/${parseInt(year)}/${parseInt(week)}/6`, []);
        db.push(`/${parseInt(year)}/${parseInt(week)}/7`, []);

        let getScheduleData = db.getData(`/${parseInt(year)}/${parseInt(week)}`);
        res.json(getScheduleData);

        console.log(`Week (${parseInt(week)}) and year (${parseInt(year)}) combination does not exist, creating data...`);
      }
    }
  }
});


/* Get current schedule */
app.get('/api/getSchedule/', function (req, res) {
  res.json(db.getData(`/${core.getYearNumber()}/${core.getWeekNumber()}`));
});


/* Start HTTP & API server */
app.listen(config.http_port);