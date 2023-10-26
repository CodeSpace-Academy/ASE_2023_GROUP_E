import connectClient from "@/database/client";

export default async function handler(req, res){


    if(req.method === "GET"){

        let client;
        try{
            client = await connectClient()

        }catch(error){
            return res.status(417).json({ message: 'failed to connect'})
        }

        const skip = parseInt(req.query.skip) || 0; 

        try{
            const db = client.db('devdb')
            const results = await db.collection('recipes')
                .find()
                .skip(skip)
                .limit(50)
                .toArray()
                res.status(200).json({ recipes : results })

        }catch(error){
            return res.status(417).json({ message: 'failed to load Recipes'})
        }
    }
}