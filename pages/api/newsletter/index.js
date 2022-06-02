import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-utils';


export default async function handler(req, res) {
  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({message: 'Connecting to the database failed!'})
    return
  }

  if(req.method === "PUT"){

    const document = {email: req.body.email}
    
    try {
      await insertDocument(client, "newsletter", 'emails', document)
      await client.close()
    } catch (error) {
      res.status(500).json({message: 'Inserting Document failed!'})
      return
    }

    res.status(200).json({message: "Added Comment!"})

  } else if (req.method === "GET") {
    
    try {
      const documents = await getAllDocuments(client, "newsletter", "emails", {_id: -1})
      client.close()
      res.status(200).json(documents)
    } catch (error) {
      res.status(500).json({message: 'Error getting Emails!'})
      return
    }
  }

}