var GPIO = require('onoff').Gpio,
led = new GPIO(16,'out'),
sensor = new GPIO(18, 'in', 'both'),
relay = new GPIO(25, 'out');
mvmt = 0;

led.writeSync(1);
console.log('led on');
led.writeSync(0);
console.log('led off');
relay.writeSync(1);

sensor.watch(function(err, state) {
console.log(state);
led.writeSync(state);
if(state == 1){
 relay.writeSync(0);
 mvmt++;
}
});

process.on('SIGINT', function () {
  led.unexport();
  sensor.unexport();
});