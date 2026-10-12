const express = require('express');

const app = express();
require("dotenv").config();

const {connectToDb} = require("./connect");
const urlRoute = require("./routes/url");

const PORT = process.env.PORT || 3000;

connectToDb(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log("Error connecting to DB", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})