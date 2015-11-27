
var Stats = require('lib/model/stats');

module.exports = RequestsCtrl;

RequestsCtrl.$inject = ['digest'];

function RequestsCtrl(digest) {

    var _this = this;

    var requests = new Stats('nginx/requests/per-min');

    requests.on('child_added', function(snapshot){
        var data = snapshot.val();
        digest.force(function(){
            _this.count = data.count;
            _this.timestamp = data.timestamp;
        });
    });

}
