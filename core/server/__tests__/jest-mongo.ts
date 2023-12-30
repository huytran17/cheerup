import mongoose from "mongoose";
import { MongoMemoryServerCoreState } from "../src/constants/mongodb-memory-server-core";
import { MongoMemoryServer } from "mongodb-memory-server-core";

let mongod = (global as any).__MONGOD__;

const initializeMongod = async () => {
  if (!mongod) {
    mongod = await MongoMemoryServer.create();
    (global as any).__MONGOD__ = mongod;
  }
};

async function connectDatabase(): Promise<void> {
  const mongo_is_not_running =
    mongod.state !== MongoMemoryServerCoreState.RUNNING;

  mongo_is_not_running && (await mongod.start());

  await mongod.ensureInstance();

  const uri = mongod.getUri();

  const mongo_options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongo_options);
}

async function closeConnection(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

async function clearDatabase(): Promise<void> {
  const collections = mongoose.connection.collections;

  const mapped_collections_into_array = [];
  for (const key in collections) {
    mapped_collections_into_array.push(collections[key]);
  }

  const delete_collection_promises = mapped_collections_into_array.map(
    async (collection) => await collection.deleteMany({})
  );

  await Promise.all(delete_collection_promises);
}

export default Object.freeze({
  initializeMongod,
  connectDatabase,
  closeConnection,
  clearDatabase,
});

export { initializeMongod, connectDatabase, closeConnection, clearDatabase };
