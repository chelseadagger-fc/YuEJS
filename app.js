const express = require("express");
const mongoose = require("mongoose");
const app = express();
const date = require(__dirname + "/date.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

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

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);



app.get("/", function(req,res) {

    let day = date.getDate();
    
    Item.find({}).then((foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems)
                .then(function() {
                    console.log("Data inserted.");
                })
                .catch(function() {
                    console.log(error);
                });
            res.redirect("/");
        } else {
        res.render("list", {listTitle: day, listItems: foundItems});
        }
    })

})


app.get("/:customListName", function(req,res) {
    const customListName = req.params.customListName;

    List.findOne({name: customListName})
        .then(function(foundList) {

            if(!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                console.log("Didn't exist; created.");
                res.redirect("/" + customListName);
            } else {
                console.log("Already exists.");

                res.render("list", {listTitle: customListName, listItems: foundList.items});
            }

        })
        .catch(function() {
            console.log(error);
        })
})


app.post("/", function(req,res) {

    const givenItem = req.body.addItem;

    const newItem = new Item({
        name: givenItem
    });

    newItem.save();
    res.redirect("/");

})

app.post("/delete", function(req,res){
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId)
        .then(function() {
            console.log("Successfully deleted by ID.")
        })
        .catch(function() {
            console.log(error);
        });
        res.redirect("/");
})


app.listen(3000, function() {
    console.log("Server is running; listening on port 3000");
})