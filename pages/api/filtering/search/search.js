import getRecipes from "@/database/getData/getRecipes"

//get results from the search text 
export default async function handler(req, res){

    if(req.method === 'GET'){
       
        //text that will be searched
        const title = req.query.title || ''
        
        try{
            const results = await getRecipes({ title : { $regex: new RegExp(title, 'i') }}, 0 , 50)
            res.status(200).json({ results: results})
        }catch(error){
            return res.status(417).json({ message:  'failed to load results', error })
        }
    }
}
