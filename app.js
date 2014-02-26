
/**
 * Module dependecies
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var sys = require('sys');
var exec = require('child_process').exec;
var child;
var image_dir=path.join(__dirname, 'public/images/');
var config = require('./config.js');
var twitter = require('ntwitter');
var twitter_update_with_media = require('./twitter_update_with_media.js');

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
io.set('log level', 1);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routing
app.get('/', function (req, res) {
  res.render('index', { title: 'Beam.io' });
});

server.listen(app.get('port'), function(){
  console.log('Express and Socket.io server listening on port ' + app.get('port'));
});


//Twitter API
var twit = new twitter(config); 
var tuwm = new twitter_update_with_media(config);

// Twitter symbols array
var watch = ['#BeamBotImage','#BeamBotTemp'];
 
twit.verifyCredentials(function (err, data) {
    if(err) console.log(err);
})
.stream('user', {track:watch}, function(stream) {
  stream.on('data', function (data) {
    if (data.text !== undefined) {
    	console.log(data.text);	

    	if(data.text == "#BeamBotImage"){
    		image_name = Number(new Date()) + ".jpg"; 	
		    image_path = image_dir + image_name;
		    var name = data.screen_name;
		    /*
		     * @child 
		     * @raspistill shell command
		     * @args -o image_path
		     * @args -w image width
		     * @args -h image height
		     */
		  	child = exec("raspistill -o "+ image_path +" -w 640 -h 480", function (err, stdout, stderr) {
		      if(err) console.log(stderr);
		      else {
		      	tuwm.post("There you go! @"+name, image_path, function(err, response) {
		        	if (err) console.log(err);
		        		console.log("Posted!")
		      	});
		      } 
		    });
    	}
    	if(data.text == "#BeamBotTemp"){
    		console.log("Temp");
    	}
    }
    
  });
  stream.on('error', function (err, code) {
    //console.log("err: "+err+" "+code)
  });
});





