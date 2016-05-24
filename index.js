var express     = require("express");
var rp          = require("request-promise");
var bodyParser  = require("body-parser");
var app         = express();

var config      = require("./config/config");

app.use("/", express.static("build")); 
app.use(bodyParser.json({urlencoded: true}));

app.post("/handshake", function(req, res){
  var data = {
    client_id     : config.slack_id,
    client_secret : config.slack_secret,
    code          : req.body.code,
    redirect_uri  : "http://localhost:3000/"
  };

  rp(serializeObject("http://slack.com/api/oauth.access", data))
    .then(function(response) {
      console.log(response);
      res.json(JSON.parse(response));
    })
    .catch(function (err) {
      res.json({message: "Something went wrong."}); 
    });
})

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(config.port, function(){
  console.log("Ready to create Slack recaps");
});


function serializeObject(url, obj){
  for (var key in obj) {
    if (url.indexOf("?") < 0) {
      url += "?";
    } else if (url !== "") {
      url += "&";
    }
    url += key + "=" + encodeURIComponent(obj[key]);
  }
  return url;
}