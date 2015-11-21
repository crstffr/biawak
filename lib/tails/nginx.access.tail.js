var Tail = require('tail').Tail;
var Tailor = require('../tailor')('nginx.access');
var tail = new Tail('/var/log/nginx/access.log');

tail.on("line", function(line) {

    var data = Tailor.parse(line);

    console.log(data);


});

module.exports = tail;
