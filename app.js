/**
 * Module dependecies
 */

var path = require('path');
var config = require('./config.js')['ntwitter'];
var twitter = require('ntwitter');
var controller = require('./controller.js');


//Twitter API Config
var twit = new twitter(config); 

// Twitter symbols array
var watch = ['#BeamIOCam','#BeamIOTemp','#BeamIOHumidity','#BeamIOIlluminance','#BeamIOPressure'];
 
twit.verifyCredentials(function (err, data) {
    if(err) console.log(err);
})
.stream('user', {track:watch}, function(stream) {
	console.log("Twitter stream is ready and waiting for inc tweets...");
	stream.on('data', function (data) {
		
		if (data.text !== undefined) {

			var name = data.user.screen_name;
			var hashtags = data.entities.hashtags;
			var options = { cam: false,
							temp: false,
							humidity: false,
							illuminance: false,
							pressure: false}

			for(var i=0,l=hashtags.length;i<l;i++){
				var hashtag = hashtags[i].text.toLowerCase();
				if( hashtag == 'beamiocam') options.cam = true;
				if( hashtag == 'beamiotemp') options.temp = true;
				if( hashtag == 'beamiohumidity') options.temp = true;
				if( hashtag == 'beamioilluminance') options.temp = true;
				if( hashtag == 'beamiopressure') options.temp = true;
			}

			if(options.cam) controller.cam(name)
			else if (options.temp) 
				controller.sensor('temp','The temperature is',name)
			else if (options.humidity) 
				controller.sensor('hum','The humidity is',name)
			else if (options.illuminance) 
				controller.sensor('illu','The illuminance is',name)
			else if (options.pressure) 
				controller.sensor('pressu','The pressure is',name)
		}
	});

	stream.on('error', function (err, code) {
		console.log("err: "+err+" "+code)
	});
});

