window.getSent = function (s) {
    try {
        var mlSent = require('sentiment');
        return mlSent(s);
    } catch (err) {
        alert (err.message);
    }
}