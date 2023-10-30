import { getCategories } from "@/database/getData/getCategories";


export default async function handler(req, res){


    try{
        const results = await getCategories()
        res.status(200).json({ categories: results})
    }catch(error){
        res.status(417).json({ message: 'failed to load categories'})
    }
}