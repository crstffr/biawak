var _ = require('lodash');
var Tail = require('tail').Tail;
var Tailor = require('../tailor')('nginx.access');
var tail = new Tail('/var/log/nginx/access.log');

var format = '$http_host\t$remote_addr\t$remote_user\t$time_local\t' +
             '$request\t$status\t$body_bytes_sent\t$request_time\t' +
             '$http_referer\t$http_user_agent';


var map = format.replace(/\$/g, '').split('\t');

console.log('map', map);


tail.on("line", function(line) {

    var data = Tailor.parse(line);

    _.map(line.split('\t'), function(a,b){

        console.log('line a', a);
        console.log('line b', b);

    });



});

module.exports = tail;
