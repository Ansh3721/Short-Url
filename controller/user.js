const User = require('../models/users');



async function handleRegisterUser(req, res){
    const {name, email, password} = req.body;
    await User.create({name, email, password});

    return res.redirect("/"); 
}

module.exports = {handleRegisterUser};