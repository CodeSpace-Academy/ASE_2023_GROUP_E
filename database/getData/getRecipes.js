import { client } from "../client"

export default async function getRecipes(filter, skip, limit, sort) {
    const db = client.db('devdb')
    const query = db.collection('recipes').find(filter).sort(sort).skip(skip)
    
    /**
     * check if limit it defined, if not, when the function is used the will be no limit set
     */
    if (limit !== undefined) {
        query.limit(limit);
    }

    const results = await query.toArray();

    return results;
}
