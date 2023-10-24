// pages/api/ingredients.js

import { fetchIngredients } from "@/database/filterData";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { ingredients } = await fetchIngredients();
    res.status(200).json({ ingredients });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
