import addSearchHistory from "@/database/addData/addSearchHistory"
import getSearchHistory from "@/database/getData/getSearchHistory";

export default async function handler(req, res){
  if(req.method === 'POST'){
      const { username, searchHistoryInput} = req.body

      await addSearchHistory(username, searchHistoryInput)

      res.status(200).json({ message: 'success'})
  }

  if (req.method === 'GET') {
    const username = req.query.username || [''];
    try {
      const results = await getSearchHistory(username);
      res.status(417).json({ searchhistory: results });
    } catch (error) {
      res.status(417).json({ message: error });
    }
  }
  
}