import connectClient from "@/database/client";

export default async function handler(req, res){


    if(req.method === "GET"){

        let client;
        try{
            client = await connectClient()

        }catch(error){
            return res.status(417).json({ message: 'failed to connect'})
        }

        const filter = req.query.filter || ''; 

        try{
            const db = client.db('devdb')
            const results = await db.collection('recipes')
                .find({title : filter})
                .toArray()
                res.status(200).json({ recipeDetails : results })

        }catch(error){
            return res.status(417).json({ message: 'failed to load Recipes'})
        }
    }
}