import mongoose from "mongoose";
import { MongoMemoryServerCoreState } from "../src/constants/mongodb-memory-server-core";
import { MongoMemoryServer } from "mongodb-memory-server-core";

let mongod = (global as any).__MONGOD__;

const initializeMongod = async () => {
  !mongod && (mongod = await MongoMemoryServer.create());

  (global as any).__MONGOD__ = mongod;
};

async function connectDatabase(): Promise<void> {
  const mongoIsNotRunning = mongod.state !== MongoMemoryServerCoreState.RUNNING;

  mongoIsNotRunning && (await mongod.start());

  await mongod.ensureInstance();

  const uri = mongod.getUri();

  const mongoOptions = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongoOptions);
}

async function closeConnection(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

async function clearDatabase(): Promise<void> {
  const collections = mongoose.connection.collections;

  const mappedCollectionsIntoArray = [];
  for (const key in collections) {
    mappedCollectionsIntoArray.push(collections[key]);
  }

  const deleteCollectionPromises = mappedCollectionsIntoArray.map(
    async (collection) => await collection.deleteMany({})
  );

  await Promise.all(deleteCollectionPromises);
}

export default Object.freeze({
  initializeMongod,
  connectDatabase,
  closeConnection,
  clearDatabase,
});

export { initializeMongod, connectDatabase, closeConnection, clearDatabase };
