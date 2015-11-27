
module.exports = require('angular').module('components', [
    require('./comps/logtail/logtail').name,
    require('./comps/nginx/requests/requests').name
]);
