var fs = require('fs'); 
var chokidar = require('chokidar'); 
var exec = require('child_process').exec; 

var cmd = function(number, text) {
        return "gammu-smsd-inject TEXT "
      + number.toString()
      + " -text "
      + '\"'+text+'\"';
};

var send = function(number, text) {
        exec(cmd(number, text));
        console.log("sms sent to "
                   + number
                   + " at "
                   + new Date());
};

var del = function () {
        exec('cd /var/spool/gammu/inbox && sudo rm *');
};

var receive = function(callback) {
    chokidar.watch('/var/spool/gammu/inbox/').on('add',function(path){
            fs.readFile(path,'utf8', function(err, content){
                    console.log(content+" from "+path.split('_')[3]);
                    if(callback)
                    callback({content: content, sender: path.split('_')[3]})
            });
    });
};

module.exports = { send: send, del: del, receive: receive};
