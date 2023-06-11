module.exports.getDate = function() {
    let date = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString("en-GB", options);
}

module.exports.getDay = function() {
    let today = new Date();
    let options = { weekday: "long" };

    return today.toLocaleDateString("en-GB", options);
}