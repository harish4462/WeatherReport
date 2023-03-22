//jshint esversion:6

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/weather.html");

});

app.post("/", function(req, res) {
  const city = req.body.cityName;
  const appkey = "6250187eded88f16ddbf69bc03d18a2f";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appkey + "&units= + unit";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The Weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The Temperature in " + city + " is " + temp + " degrees celcius.</h1>");
      res.write("<img src= " + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("started server at 3000");
});
