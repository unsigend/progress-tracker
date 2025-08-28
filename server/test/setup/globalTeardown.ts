// just stop the mongo server
export default async function globalTeardown() {
    await (global as any).__MONGOSERVER__.stop();
}
