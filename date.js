
module.exports = getDate;

function getDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let day = date.toLocaleDateString("en-GB", options);
    return day;
}