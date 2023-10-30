import { client } from "../client"

export async function getCategories(){

    const db = client.db('devdb')
    const results = await db.collection('categories').find().toArray()

    return results
}
