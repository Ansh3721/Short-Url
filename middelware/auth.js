const User = require("../models/users");

async function restrictToLoginUser(req, res, next){
    const sessionId = req.cookies.uid;
    if(!sessionId){
        return res.redirect("/login");
    }
    const user = await User.findOne({sessionId});
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const sessionId = req.cookies.uid;
    const user = await User.findOne({sessionId});
    if(user){
        req.user = user;
    }
    next();
}

module.exports = {restrictToLoginUser, checkAuth};
