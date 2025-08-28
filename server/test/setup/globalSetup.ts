import { MongoMemoryServer } from "mongodb-memory-server";

// start the mongo server
// set the MONGO_URI to the instance uri
// store the instance in the global object
export default async function globalSetup() {
    const instance = await MongoMemoryServer.create();
    process.env.MONGO_URI = instance.getUri();
    (global as any).__MONGOSERVER__ = instance;
}
