'use strict';
const express = require("express");
const strftime = require("strftime");

const app = express();

app.get("/:date(*)", (req, res) => {
  const dateString = req.params.date;
  
  if (dateString === "favicon.ico")
    return res.sendStatus(404);
  
  // If it can be parsed as a number, consider it a Unix timestamp
  // Any non-digits will cause it to return NaN which is falsy
  const unixTime = Number(dateString);
  
  const date = unixTime || unixTime === 0 ?
    // Date constructor only supports Unix time in milliseconds
    new Date(unixTime * 1000) : new Date(dateString);
  
  let dateJSON = {
    unix: null,
    natural: null
  };
  
  if (!Number.isNaN(date.getTime())) {
    dateJSON.unix = date.getTime() / 1000;
    dateJSON.natural = strftime("%B %e, %Y", date);
  }
  
  res.json(dateJSON);
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on ${listener.address().port}`);
});