const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const listItems = ["Wake up at 11am", "Teach English on Engoo", "Write Lesson Notes", "Study Javascript"];
const workItems = ["Log Into Engoo", "Check Classes", "Open Study Sessions"];


app.get("/", function(req,res) {

    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let day = date.toLocaleDateString("en-GB", options);

    res.render("list", {listTitle: day, listItems: listItems});

})

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work", listItems: workItems});
})


app.post("/", function(req,res) {

    let newItem = req.body.addItem;


    if (req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        listItems.push(newItem);
        res.redirect("/");
    }

})


app.listen(3000, function() {
    console.log("Server is running; listening on port 3000");
})