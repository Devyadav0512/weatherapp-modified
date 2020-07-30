const express = require("express");
const app = express();
// const request = require('request');
const bodyparser = require("body-parser");
const { request } = require("express");
// const rp = require('request-promise')
const axios = require('axios')

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

let weather;
let location;
let coordinate;
let temperature;
let image;
let haha = (location) => {
  axios
    .get('https://www.metaweather.com/api/location/search/?query='+location)
    .then((response) => {
      coordinate = JSON.parse(response.data[0].woeid)
      console.log(coordinate)
      axios
        .get('https://www.metaweather.com/api/location/'+coordinate+'/')
        .then((resp) => {
          weather = resp.data.consolidated_weather[0].weather_state_name
          temperature = resp.data.consolidated_weather[0].the_temp
          console.log(weather,temperature)

        })
    .catch((err) => {
      console.log(err)
    })
      
    })
    .catch((error) => {
      console.log(error)
    })
}

app.get("/", (req, res) => {
  console.log('hahha')
  res.render("home", {location: location, weather: weather, temperature: temperature, image: image});
});

app.post("/loc", (req, res, next) => {
    location = req.body.location;
     axios
    .get('https://www.metaweather.com/api/location/search/?query='+location)
    .then((response) => {
      coordinate = JSON.parse(response.data[0].woeid)
      console.log(coordinate)
      axios
        .get('https://www.metaweather.com/api/location/'+coordinate+'/')
        .then((resp) => {
          weather = resp.data.consolidated_weather[0].weather_state_name
          temperature = resp.data.consolidated_weather[0].the_temp
          console.log(weather,temperature)
          res.redirect('/loc')
        })
    .catch((err) => {
      console.log(err)
    })
      
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get("/", function(req, res) {
  rp(someURL).then(result => {
      // do some processing of result into finalData
      res.send(finalData);
  }).catch(err => {
      console.log(err);
      res.sendStatus(501);
  });
});

app.get("/loc", (req, res) => {
  console.log('hahha22222')
  res.status(200).json({weather: weather,loc: location, cor: coordinate,temp: temperature});
});


app.get("*", function(req, res) {
	res.send("Invalid URL!!");
});

app.listen(3000, function () {
	console.log("Serving on localhost:3000");
})


