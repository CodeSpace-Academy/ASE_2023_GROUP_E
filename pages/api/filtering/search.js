import connectClient from "@/database/client"

//get results from the search text 
export default async function handler(req, res){

    if(req.method === 'GET'){
       
        let client

        //text that will be searched
        const title = req.query.title || ''

        try{
            client = await connectClient()

            const db = client.db('devdb')
            //regex is used to get results from an incasensative input
            const results = await db.collection('recipes').find({ title : { $regex: new RegExp(title, 'i') }}).limit(50).toArray();
    
            res.status(200).json({ results: results})
        }catch(error){
            return res.status(417).json({ message:  'failed to load results', error })
        }
    }
}
