
const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");

const app = express();
//const open_ai_api_key = "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";
const weatherApiKey = "288bbaf567fbbc399533e9685e938241";

port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));         //used to access the data entered in the website.
app.use(bodyParser.json());

app.get("/", function(req,res){
    
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const cityName = req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + weatherApiKey + "&units=metric";
    var temperature
    https.get(url,(response)=>{
        
        if(response.statusCode==200){                           //checking if correct city is entered
            response.on("data", function(data){
                const weatherData=JSON.parse(data);
                temperature = weatherData.main.temp;
                console.log("the temperature at " + cityName + " is " + temperature);
            })
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    });
    
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(port,function(){
    console.log("whether project has started on port" + port);
})