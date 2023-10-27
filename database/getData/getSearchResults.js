import { client } from "../client";

export default async  function search(title){

    const db = client.db('devdb')

    //regex is used to get results from an incasensative input
    const results = await db.collection('recipes').find({ title : { $regex: new RegExp(title, 'i') }}).limit(50).toArray();

    return results
}