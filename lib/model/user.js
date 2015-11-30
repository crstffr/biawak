var Model = require('./model');

module.exports = UserModel;

function UserModel(user) {
    return new Model('user/' + user);
}
