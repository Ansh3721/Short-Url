const User = require('../models/users');
const {v4 : uuidv4} = require("uuid");



async function handleRegisterUser(req, res){
    const {name, email, password} = req.body;
    await User.create({name, email, password});

    return res.redirect("/login"); 
}

async function handleLoginUser(req, res){
    const {email, password} = req.query;
    const sessionId = uuidv4();
    const user = await User.findOneAndUpdate({email, password}, {sessionId: sessionId});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    res.cookie("uid" , sessionId);
    return res.redirect("/");
}

module.exports = {handleRegisterUser, handleLoginUser};