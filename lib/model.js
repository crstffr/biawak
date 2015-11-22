
var config = require('./config');
var Firebase = require('firebase');
var fbconfig = config.get('firebase');

if (!fbconfig.url) {
    console.error('Firebase URL not set, run install to setup Firebase');
    process.exit(9);
}

var appRef = new Firebase('https://' + fbconfig.url);

appRef.authWithCustomToken(fbconfig.secret, function(error) {
    if (error) {
        console.error('Firebase secret failed auth, run install to setup Firebase');
        process.exit(9);
    } else {
        console.log('Saving all data to:', fbconfig.url);
    }
});

module.exports = Model;

function Model(path) {

    return appRef.child(path);

}
