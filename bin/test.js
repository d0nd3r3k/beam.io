var exec = require('child_process').exec;
var child;
var path = require('path');

child = exec("python baselisten.py", function(err, stdout, stderr){
				if(err) console.log(err)
				console.log(stdout);	
				data = JSON.parse(stdout);
				/*data = {"sensors": {
					    "sht_temperature":  24.34,
					    "sht_humidity":  46.4,
					    "illuminance": 0,
					    "bmp_pressure":  1016.16,
					    "bmp_temperature":  24.3
					}}
				console.log(data.sensors.bmp_temperature);
				if (type == "temp") value = data.sensors.sht_temperature + " &deg;C";
				if (type == "hum") value = data.sensors.sht_humidity + " %";
				if (type == "illu") value = data.sensors.illuminance + " Lx";
				if (type == "pressu") value = data.sensors.bmp_pressure + " Pa";
				
				message = message + ": " + value;
				console.log(message);
				tuwm.post(message+" @"+name, image_path, function(err, response) {
					if (err) console.log(err);
					console.log(response)
				});*/
})