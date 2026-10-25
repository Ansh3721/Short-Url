const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
require("dotenv").config();

const path = require("path");

const {connectToDb} = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const {restrictToLoginUser, checkAuth} = require("./middelware/auth");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(async (req, res, next)=>{
    try{
        await connectToDb(process.env.MONGO_URL);
        next();
    }catch(error){
        next(error);
    }
});

app.use("/url",restrictToLoginUser, urlRoute);
app.use("/user",userRoute);
app.use("/", checkAuth, staticRoute);

app.use((error, req, res, next)=>{
    console.error("Request failed", error);
    res.status(500).json({error: "Internal server error"});
});

if(require.main === module){
    app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;