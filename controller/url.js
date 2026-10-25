const { nanoid } = require("nanoid");
const URL = require('../models/url');

async function generateUrlHandler(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : "url is required"});
    }
    const existing = await URL.findOne({
        redirectUrl : body.url,
    });
    if(existing){
        const allurls = await URL.find({createdBy : req.user._id});
        return res.render("home", {
            id : existing.shortId,
            urls : allurls,
        });
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId : shortId,
        redirectUrl : req.body.url,
        visitHistory : [],
        createdBy : req.user._id,
    })

    const allurls = await URL.find({});
    return res.render("home", {
        id : shortId,
        urls : allurls,
    })
}

async function handleRedirect(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push :{
            visitHistory : {
                timestamp : Date.now(),
            }
        }
    })
    if(!entry){
        return res.status(404).json({error : "URL not found"});
    }
    res.redirect(entry.redirectUrl);
}

async function handlegetAnalytics(req, res){
    const shortId = req.params.shortId;
    console.log(shortId);
    const entry = await URL.findOne({
        shortId,
    });
    console.log(shortId);
    console.log(entry);
    if(!entry){
        return res.status(404).json({error : "URL not found"});
    }
    res.json({totalClicks : entry.visitHistory.length,
        analytics : entry.visitHistory,
    });
}

async function handleDelete(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndDelete({
        shortId,
    });
    if(!entry){
        return res.status(404).json({error : "URL not found"});
    }
    res.redirect("/");
}

module.exports = {generateUrlHandler, handleRedirect, handlegetAnalytics,handleDelete};