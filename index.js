var express     = require("express");
var app         = express();

var config      = require("./config/config");

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port, function(){
  console.log("Ready to create Slack recaps");
});
