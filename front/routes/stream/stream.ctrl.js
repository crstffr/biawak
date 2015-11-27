
var stream = require('lib/model/stream');

module.exports = StreamCtrl;

StreamCtrl.$inject = ['digest'];

function StreamCtrl(digest) {

    var _this = this;

    _this.items = [];

    console.log(_this);

    stream.limitToLast(4).on('child_added', function(snapshot) {
        digest.force(function(){
            _this.items.push(snapshot.val());
        });
    });

}
