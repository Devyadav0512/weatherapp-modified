const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const axios = require('axios')

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

let weather;
let location;
let coordinate;
let temperature;
let image;

app.get("/", (req, res) => {
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
          res.redirect('/')
        })
    .catch((err) => {
      console.log(err)
    })
      
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get("*", function(req, res) {
	res.send("Invalid URL!!");
});

app.listen(3000, function () {
	console.log("Serving on localhost:3000");
})


