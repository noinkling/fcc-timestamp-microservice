'use strict';
const express = require("express");
const strftime = require("strftime");

const app = express();

app.get("/:date", (req, res) => {
  const dateString = req.params.date;
  
  if (dateString === "favicon.ico")
    return res.sendStatus(404);
    
  const date = new Date(dateString);
  
  let dateJSON = {
    unix: null,
    natural: null
  };
  
  if (!Number.isNaN(date.getTime())) {
    dateJSON.unix = date.getTime();
    dateJSON.natural = strftime("%B %e, %Y", date);
  }
  
  res.json(dateJSON);
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on ${listener.address().port}`);
});