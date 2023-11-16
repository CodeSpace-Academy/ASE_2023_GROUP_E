import getRecipes from "@/database/getData/getRecipes"

export default async function handler(req, res){

    if(req.method === 'GET'){

        const category = req.query.category
        
        try{
            const result = await getRecipes({category: category}, 0, 5)
            res.status(200).json({ categories : result })
        }catch(error){
            res.status(417).json({ message: error })
        }
    }
}