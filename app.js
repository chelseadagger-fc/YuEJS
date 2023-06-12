const express = require("express");
const mongoose = require("mongoose");
const app = express();
const date = require(__dirname + "/date.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// const listItems = ["Wake up at 11am", "Teach English on Engoo", "Write Lesson Notes", "Study Javascript"];
// const workItems = ["Log Into Engoo", "Check Classes", "Open Study Sessions"];

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todoDB');
}


const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemsSchema);


const wakeUp = new Item({
    name: 'Wake up at 11am'
})

const engooStart = new Item({
    name: 'Teach English on Engoo'
})

const engooNotes = new Item({
    name: 'Write Lesson Notes'
})

const defaultItems = [wakeUp, engooStart, engooNotes];

Item.insertMany(defaultItems)
.then(function() {
    console.log("Data inserted.");
})
.catch(function() {
    console.log(error);
})


app.get("/", function(req,res) {

    let day = date.getDate();

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