const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "../notes.html"));
});

router.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../index.html"));

});

module.exports = router;
