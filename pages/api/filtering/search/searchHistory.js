import addSearchHistory from "@/database/addData/addSearchHistory"
import getRecipes from "@/database/getData/getRecipesData";

export default async function handler(req, res){
  if(req.method === 'POST'){
      const { username, searchHistoryInput} = req.body

      await addSearchHistory(username, searchHistoryInput)

      res.status(200).json({ message: 'success'})
  }

  if (req.method === 'GET') {
    const username = req.query.username || [''];
    try {
      const { removeId } = await getRecipes('searchHistory', 0, 5, {createdAt: 1}, [], [], '', 0 , null, '', '', username );
      res.status(417).json({ searchhistory: removeId });
    } catch (error) {
      res.status(417).json({ message: error });
    }
  }
  
}