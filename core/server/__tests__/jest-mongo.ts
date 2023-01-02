import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-core";

let mongod = (global as any).__MONGOD__;

const initializeMongod = async () => {
  if (!mongod) {
    mongod = await MongoMemoryServer.create();
  }

  (global as any).__MONGOD__ = mongod;
};

async function connectDatabase(): Promise<void> {
  if (!!mongoose.connection) {
    return;
  }

  await mongod.start();

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
