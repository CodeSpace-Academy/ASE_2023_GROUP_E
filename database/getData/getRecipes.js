import { client } from "../client"

export default async function getRecipes(filter, skip, limit, sort) {
    try{
        const db = client().db('devdb');
        const recipesCollection = db.collection('recipes');
    
        /**
         * Create a query object with the filter, sort, and skip
         */
        const query = recipesCollection.find(filter).sort(sort).skip(skip);
    
        /**
         * check if limit is defined, if not, when the function is used the will be no limit set
         */
        if (limit !== undefined) {
            query.limit(limit);
        }
    
        /**
         * Use the countDocuments method to get the total number of recipes that match the filter
         */
        const totalRecipes = await recipesCollection.countDocuments(filter);
    
        const results = await query.toArray();
    
        return {
            totalRecipes,
            recipes: results,
        };
    }catch(error){
        console.log('failed to load data')
    }
}
