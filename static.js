#!/usr/bin/env node

var express = require('express');

module.exports = new StaticServer();

function StaticServer() {

    var _this = this;
    this.app = express();
    this.app.use(express.static(__dirname));
    this.app.get('*', function(req, res, next) {
        res.sendFile(__dirname + '/index.html');
    });

    this.start = function() {
        _this.app.listen(8666);
        console.log('Static server started on http://localhost:8666');
    }

}
