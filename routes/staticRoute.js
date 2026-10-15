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

module.exports = router;