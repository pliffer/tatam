let SerialPort = require('serialport');

let Tatam = require('./tatam');

let serialPort = new SerialPort('/dev/ttyACM0', {
	baudRate: 57600
});

Tatam.jwt = "";

Tatam.start();

serialPort.on('data', data => {

    var a2 = parseInt(data.toString());

	if(a2 && a2 > 4){

        Tatam.trigger(a2);

    }

});