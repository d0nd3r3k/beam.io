var exec = require('child_process').exec;
var child;
var path = require('path');
var twitter_update_with_media = require('./twitter_update_with_media.js');
var image_dir=path.join(__dirname, 'public/images/');
var config = require('./config.js')['tumw'];
var tuwm = new twitter_update_with_media(config);
var fs = require('fs');
/*
 * @cam 
 * @param name twitter handler
 * @exec raspistill, tweet image
 * 
 */
exports.cam = function(name){
	var image_name = Number(new Date()) + ".jpg";
	var image_path = image_dir + image_name;
	child = exec("raspistill -o "+ image_path +" -w 640 -h 480", function (err, stdout, stderr) {
		if(err) console.log(stderr);
		else {
			tuwm.post("There you go! @"+name, image_path, function(err, response) {
				if (err) console.log(err);
				console.log(response)
			});
		} 
	});
}

/*
 * @sensor
 * @type Tidmarsh Sensor Node v2.0, MIT Media Lab
 * @message The tweet 
 * @param name twitter handler
 * @exec raspistill, tweet image
 * @exec baselisten.py, get sensor data
 */
exports.sensor = function(type, message, name){
	var image_name = Number(new Date()) + ".jpg";
	var image_path = image_dir + image_name;
	child = exec("raspistill -o "+ image_path +" -w 640 -h 480", function (err, stdout, stderr) {
		if(err) console.log(stderr);
		else {
			child = exec("python bin/baselisten.py", function(err, data, stderr){
				if(err) console.log(err)
				//var data = JSON.parse(sensdata);
				json = JSON.parse(data.replace(/ /g,""));
				console.log(json)
				//console.log(data.sensors.bmp_temperature);
				/*if (type == "temp") value = data.sensors.sht_temperature + " &deg;C";
				if (type == "hum") value = data.sensors.sht_humidity + " %";
				if (type == "illu") value = data.sensors.illuminance + " Lx";
				if (type == "pressu") value = data.sensors.bmp_pressure + " Pa";*/
				
				//message = message + ": " + value;
				//console.log(message);
				/*tuwm.post(message+" @"+name, image_path, function(err, response) {
					if (err) console.log(err);
					console.log(response)
				});*/
			})
		} 
	});
}

