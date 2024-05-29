const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function connect(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery',true)

    const db = await mongoose.connect(getUri);
    console.log("database connected");

    return db;
}

module.exports = connect;