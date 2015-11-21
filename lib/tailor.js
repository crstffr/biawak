module.exports = function(type) {

    this.parse = function(line) {
        return {
            type: type,
            timestamp: Math.floor(Date.now() / 1000),
            rawstring: line
        }
    }

};
