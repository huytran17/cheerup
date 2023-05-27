import mongoose from "mongoose";
import _ from "lodash";

async function makeDb() {
  const DATABASE_URL = makeDatabaseURL();
  const DATABASE_OPTIONS = makeDatabaseOptions();

  const is_not_connected = mongoose.connection.readyState == 0;
  if (is_not_connected) {
    await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
    console.log("Successfully connected to DB");
  }

  return mongoose;
}

export function makeDatabaseURL(): string {
  const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_HOST,
  } = process.env;

  const DATABASE_URL = `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_INITDB_HOST}/?retryWrites=true&w=majority`;

  return DATABASE_URL;
}

export function makeDatabaseOptions() {
  const options = {
    connectTimeoutMS: 10000,
  };

  return options;
}

export default makeDb;
