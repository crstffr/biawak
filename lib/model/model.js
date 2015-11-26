
var firebase = require('../service/firebase');

module.exports = Model;

function Model(path) {

    return firebase.app.child(path);

}
