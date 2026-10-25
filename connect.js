const mongoose = require("mongoose");

let connectionPromise;

async function connectToDb(url){
    if(!url){
        throw new Error("MONGO_URL is not configured");
    }

    if(mongoose.connection.readyState === 1){
        return mongoose.connection;
    }

    if(!connectionPromise){
        connectionPromise = mongoose.connect(url).catch((error)=>{
            connectionPromise = undefined;
            throw error;
        });
    }

    return connectionPromise;
}

module.exports = {connectToDb};