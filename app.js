
/**
 * Module dependecies
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = require('http').createServer(app);

var sys = require('sys');
var exec = require('child_process').exec;
var child;
var config = require('./config.js')['ntwitter'];
var twitter = require('ntwitter');
var controller = require('./controller.js');
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

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//Twitter API Config
var twit = new twitter(config); 

// Twitter symbols array
var watch = ['#BeamIOCam','#BeamIOTemp','#BeamIOHumidity','#BeamIOIlluminance','#BeamIOPressure'];
 
twit.verifyCredentials(function (err, data) {
    if(err) console.log(err);
})
.stream('user', {track:watch}, function(stream) {
	stream.on('data', function (data) {
		
		if (data.text !== undefined) {

			var name = data.user.screen_name;
			var hashtags = data.entities.hashtags;
			var choice = 0;

			console.log(name);
			console.log(hashtags)

			for(var i=0,l=hashtags.length;i<l;i++){
				if(hashtags[i].text.toLowerCase() == 'beamiocam') choice++;
				else if(hashtags[i].text.toLowerCase() == 'beamiotemp') choice += 3;
				else if(hashtags[i].text.toLowerCase() == 'beamiohumidity') choice += 5;
				else if(hashtags[i].text.toLowerCase() == 'beamioilluminance') choice += 7;
				else if(hashtags[i].text.toLowerCase() == 'beamiopressure') choice += 11;
			}

			console.log(choice)

			if(choice == 1 ) controller.cam(name)
			else if (choice == 4 || choice == 3) 
				controller.sensor('temp','The temperature is',name)
			else if (choice == 6 || choice == 5) 
				controller.sensor('hum','The humidity is',name)
			else if (choice == 8 || choice == 7) 
				controller.sensor('illu','The illuminance is',name)
			else if (choice == 12 || choice == 11) 
				controller.sensor('pressu','The pressure is',name)
		}
	});

	stream.on('error', function (err, code) {
		console.log("err: "+err+" "+code)
	});
});

