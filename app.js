const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const apiRoutes = require("./public/routes/api");
const htmlRoutes = require("./public/routes/htmljs");

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});