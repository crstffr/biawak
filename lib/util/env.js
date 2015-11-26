
module.exports = {

    node: function() {
        return typeof process !== 'undefined';
    },

    browser: function() {
        return typeof window !== 'undefined';
    }

};
