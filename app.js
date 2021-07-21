const express = require("express")
const https = require("https")

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname+ "/index.html");

  // res.send("Server is up and running");
})

app.post("/", function(req,res){
  console.log("Post request Recieved")
  console.log(req.body.cityName);



  const city= req.body.cityName;
  const api_key = "046f6e50401b138f65c4b9efcdcd2e21";
  const units = "metrics";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ units+ "&appid=" + api_key;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon_id = weatherData.weather[0].icon;

    const img_url = "https://openweathermap.org/img/wn/" + "10d" + "@2x.png";

    res.write("<h1>the temperature in " + city + " is " +  temp + " celcius and is </h1>");
    res.write("<p> description is "+ description + "</p>");
    res.write("<img src="+ img_url +">")
    

    })

  });
})


app.listen(3000, function(){
  console.log("server is running on port 3000");
})
