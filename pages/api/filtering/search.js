import connectClient from "@/database/client"

export default async function handler(req, res){


    if(req.method === 'GET'){
       
        let client
        const title = req.query.title

        try{
            client = await connectClient()

            const db = client.db('devdb')
            const results = await db.collection('recipes').find({ title : title}).toArray();
    
            res.status(200).json({ results: results})
        }catch(error){
            return res.status(417).json({ message:  'failed to load results', error })
        }
    }
}
