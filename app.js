const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

let items = [];

app.get("/", function(req, res) {

    let today = new Date();

    let dayOptions = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", dayOptions);

    res.render("list", {day: day, newListItems: items})

});

app.post("/", (req, res) => {

    let item = req.body.addItem;
    items.push(item);

    res.redirect("/");

})


app.listen(3000, function() {
    console.log("Server is running, listening to port 3000");
});