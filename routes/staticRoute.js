const app = require("express");
const router = app.Router();
const URL = require('../models/url');

router.get("/", async (req, res)=>{
    if(!req.user){
        return res.redirect("/login");
    }
    const allurls = await URL.find({createdBy : req.user._id});
    return res.render("home",{
        urls : allurls,
    }
    );
});

router.get("/register",(req, res)=>{
    return res.render("register");
})

router.get("/login",(req, res)=>{
    return res.render("login");
});

module.exports = router;