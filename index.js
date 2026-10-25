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

connectToDb(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log("Error connecting to DB", err);
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use("/url",restrictToLoginUser, urlRoute);
app.use("/user",userRoute);
app.use("/", checkAuth, staticRoute);


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})