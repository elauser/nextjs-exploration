import { MongoClient, ServerApiVersion } from 'mongodb';
import { mongodb_uri } from '../../../helpers/secrets';

const uri = mongodb_uri
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export default async function handler(req, res) {

  if(req.method === "PUT"){
    await client.connect();

    const db = client.db("newsletter")

    await db.collection('emails').insertOne({email: req.body.email})

    client.close()
    res.status(200).json({message: "Signed up!"})

  } else if (req.method === "GET") {
    const emails = await getAllEmails()
    res.status(200).json(emails)
  }

}