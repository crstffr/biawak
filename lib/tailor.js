module.exports = function (type) {
    return {
        parse: function (line) {
            return {
                params: {},
                type: type,
                rawstring: line,
                timestamp: Date.now()
            }
        }
    }
};
