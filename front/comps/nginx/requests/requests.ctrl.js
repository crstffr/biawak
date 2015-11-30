var Stat = require('lib/model/stat');

module.exports = RequestsCtrl;

RequestsCtrl.$inject = ['digest'];

function RequestsCtrl(digest) {

    var _this = this;
    var model = new Stat('nginx/requests');

    model.history.on('child_added', function (snapshot) {
        var data = snapshot.val();
        digest.force(function () {
            _this.count = data.count;
            _this.timestamp = data.timestamp;
        });
    });

}
