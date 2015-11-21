var Tail = require('tail').Tail;
var Tailor = require('../tailor')('nginx.access');
var tail = new Tail('/var/log/nginx/access.log');

var format = '$remote_addr - $remote_user [$time_local] ' +
    '"$request" $status $body_bytes_sent "$http_referer" ' +
    '"$http_user_agent" "$http_x_forwarded_for" "$http_host"';

var Ginx = require('ginx');
var ginx = new Ginx(format, {persistent: false});


tail.on("line", function(line) {

    var data = Tailor.parse(line);

    ginx.parseLine(line, function(data){
        console.log(data);
    });

});

module.exports = tail;
