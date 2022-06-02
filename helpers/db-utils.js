import { mongodb_uri } from './secrets';
import { MongoClient } from 'mongodb';

const client = new MongoClient(mongodb_uri);

export async function connectDatabase() {

  await client.connect()
  return client
}

export const insertDocument = async (client, db, collection, document) => {
  const db_client = client.db(db)

  await db_client.collection(collection).insertOne(document)
}

export const getAllDocuments = async (client, db, collection, sortBy={}) => {
  const db_client = client.db(db)
  const documents = await db_client.collection(collection).find().sort(sortBy).toArray()
  return documents
}