Tail = require('tail').Tail;

tail = new Tail('/var/log/nginx/access.log');

tail.on("line", function(data) {
  console.log('nginx access', data);
});

module.exports = tail;
