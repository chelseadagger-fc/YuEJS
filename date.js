module.exports.getDate = function() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString("en-GB", options);
}

module.exports.getDay = function() {
    const today = new Date();
    const options = { weekday: "long" };

    return today.toLocaleDateString("en-GB", options);
}