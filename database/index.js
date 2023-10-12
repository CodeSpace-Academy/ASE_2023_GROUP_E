import { connectDatabase } from "./mongoDB";

export async function run(pageSizing) {
  let client = await connectDatabase();
  const db = client.db('devdb');

  const documents = await db
    .collection('recipes')
    .find()
    .skip(0) // You can remove the `page` variable here
    .limit(parseInt(pageSizing))
    .toArray();

  const menuList = documents.map((doc) => {
    const { _id, ...menuData } = doc;
    return menuData;
  });

  return menuList;
}
