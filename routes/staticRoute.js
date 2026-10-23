const app = require("express");
const router = app.Router();
const URL = require('../models/url');

router.get("/", async (req, res)=>{
    const allurls = await URL.find({});
    return res.render("home",{
        urls : allurls,
    }
    );
});

router.get("/register",(req, res)=>{
    return res.render("register");
})

module.exports = router;