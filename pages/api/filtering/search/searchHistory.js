import addSearchHistory from "@/database/addData/addSearchHistory"

export default async function handler(req, res){
    if(req.method === 'POST'){
        const { username, searchHistoryInput} = req.body

        await addSearchHistory(username, searchHistoryInput)

        res.status(200).json({ message: 'success'})
    }
}