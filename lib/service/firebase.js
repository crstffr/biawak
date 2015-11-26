var out = require('../util/out');
var Firebase = require('firebase');
var config = require('../config').firebase;

module.exports = new FirebaseService();

function FirebaseService() {

    if (!config.url) {
        out.configError('Firebase URL not set, run install to setup Firebase');
    }

    this.app = new Firebase('https://' + config.url);

    this.app.authWithCustomToken(config.secret, function(error) {
        if (error) { out.configError('Firebase secret failed auth, run install to setup Firebase'); }
    });

}


