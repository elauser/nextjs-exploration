import { connectDatabase, getAllDocuments, insertDocument } from '../../../helpers/db-utils';

export default async function handler(req, res){
  const eventId = req.query.eventId
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({message: 'Connecting to the database failed!'})
    return
  }

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

    try {
      await insertDocument(client, "events", 'comments', newComment)
      await client.close()
    } catch (error) {
      res.status(500).json({message: 'Inserting Document failed!'})
      return
    }

    res.status(200).json({message: "Signed up!"})
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, "events", "comments", {_id: -1})
      client.close()
      res.status(200).json(documents)
    } catch (error) {
      res.status(500).json({message: 'Error getting Documents!'})
      return
    }
  }
}