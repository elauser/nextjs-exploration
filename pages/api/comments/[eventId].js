import { MongoClient, ServerApiVersion } from 'mongodb';
import { mongodb_uri } from '../../../helpers/secrets';

const uri = mongodb_uri
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const db = client.db("events")

export default async function handler(req, res){
  const eventId = req.query.eventId


  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (!email.includes('@')){
      res.status(422).json({message: 'Invalid input.'})
      return
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    }

    await client.connect();

    const result = await db.collection('comments').insertOne(newComment)
    console.log(result)

    client.close()
    res.status(200).json({message: "Signed up!"})
  }

  if (req.method === 'GET') {

    await client.connect();

    const documents = await db.collection('comments').find().sort({_id: -1}).toArray()

    client.close()

    res.status(200).json(documents)
  }
}