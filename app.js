const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

const listItems = ["Wake up at 11am", "Teach English on Engoo", "Write Lesson Notes", "Study Javascript"]

app.get("/", function(req,res) {

    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    let day = date.toLocaleDateString("en-GB", options);

    res.render("list", {day: day, listItems: listItems})

})


app.post("/", function(req,res) {

    let newItem = req.body.addItem;

    listItems.push(newItem);

    res.redirect("/")

})


app.listen(3000, function() {
    console.log("Server is running; listening on port 3000")
})