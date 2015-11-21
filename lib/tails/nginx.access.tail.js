var Ginx = require('ginx');
var Tail = require('tail').Tail;
var Tailor = require('../tailor')('nginx.access');
var tail = new Tail('/var/log/nginx/access.log');

var format = '$remote_addr - $remote_user [$time_local] ' +
    '"$request" $status $body_bytes_sent "$http_referer" ' +
    '"$http_user_agent" "$http_x_forwarded_for" "$http_host"';

var ginx = new Ginx(format, {
    persistent: false,
    storageFile: __dirname + '/.cursors'
});

// ginx.parseFile('/var/log/nginx/access.log', function() {});

tail.on("line", function(line) {

    var data = Tailor.parse(line);

    ginx.parseLine_old(line, function(err, data){
        console.log(data);
    });

});

module.exports = tail;
