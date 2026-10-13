const { nanoid } = require("nanoid");
const URL = require('../models/url');

async function generateUrlHandler(req, res){
    const body = req.body;
    console.log(body);
    if(!body.url){
        return res.status(400).json({error : "url is required"});
    }
    const existing = await URL.findOne({
        redirectUrl : body.url,
    });
    if(existing){
        return res.json({id : existing.shortId});
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId : shortId,
        redirectUrl : req.body.url,
        visitHistory : [],
    })

    res.json({id : shortId});
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

module.exports = {generateUrlHandler, handleRedirect, handlegetAnalytics};