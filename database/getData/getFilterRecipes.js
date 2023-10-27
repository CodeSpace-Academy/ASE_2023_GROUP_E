import { client } from "../client"


export default async function getFilteredRecipes(filter, skip){


    const db = client.db('devdb')
    const results = await db.collection('recipes')
        .find(filter)
        .skip(skip)
        .limit(50)
        .toArray()


        return results
}

export async function getCategories(){

    const db = client.db('devdb')
    const results = await db.collection('categories').find().toArray()

    return results
}
