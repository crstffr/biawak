module.exports = function (type) {
    return {
        parse: function (line) {
            return {
                params: {},
                type: type,
                rawstring: line,
                timestamp: Math.floor(Date.now() / 1000),
            }
        }
    }
};
