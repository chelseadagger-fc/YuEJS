const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {

    let today = new Date();
    let currentDay = today.getDay()
    let day = "";

    switch(currentDay) {
        case 0:
            day = "It is a Sunday.";
            break;
        case 1:
            day = "It is a Monday.";
            break;
        case 2:
            day = "It is a Tuesday.";
            break;
        case 3:
            day = "It is a Wednesday.";
            break;
        case 4:
            day = "It is a Thursday.";
            break;
        case 5:
            day = "It is a Friday.";
            break;
        case 6:
            day = "It is a Saturday.";
            break;
        default:
            console.log("Error: current day is equal to: " + currentDay);
    }

    res.render("list", {day: day})

});


app.listen(3000, function() {
    console.log("Server is running, listening to port 3000");
});