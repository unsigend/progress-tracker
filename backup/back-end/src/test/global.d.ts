import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
    var __MONGOINSTANCE: MongoMemoryServer;
}

export {};
