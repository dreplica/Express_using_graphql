import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer();

//connect to memory server
export async function connect() {
    const uri = await mongod.getUri();
    const mongooseOpt = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };
    await console.log(uri)
    await mongoose.connect(uri,mongooseOpt)
    console.log('connected')
}

//disconnect from memory server

export async function  disconnect() {
    await mongoose.disconnect();
    await mongod.stop();

}

//clear db memory database

export async function clearDatabase() {
    const collections = mongoose.connection.collections;

    for (let key in collections) {
        const collection = collections[key];
        await collection.drop();
    }
}