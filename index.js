const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');

// app.get("/", (req, res)=>{
//     res.render("index");
// });
// app.get("/:username", (req, res)=>{
//     res.send(`Welcome ${req.params.username}`);
// });
// app.get("/:username/:city", (req, res)=>{
//     res.send(`Welcome ${req.params.username} your city is ${req.params.city}.`);
// });

app.get("/", (req, res)=>{
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files:files});
    })
});

app.get("/file/:filename", (req, res)=>{
    fs.readFile(`./files/${ req.params.filename}`, "utf-8" ,function( filedata){
        res.render('show', {filename:req.params.filename, filedata: filedata})
    }) 
});

app.get("/edit/:filename", (req, res)=>{
    res.render('edit', {filename: req.params.filename});
});

app.post("/edit", function(req, res){
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){
        res.redirect("/");
    });
});

app.post("/create", (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect('/')
    });
});

app.listen(3000, ()=> {
    console.log("app is listining on http://localhost:3000/");
})