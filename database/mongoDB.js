import { MongoClient } from 'mongodb'

export async function connectDatabase() {

  const client = await MongoClient.connect('mongodb+srv://groupe:lx0hIlKaDof7KBJY@groupe.pse1kuk.mongodb.net/devdb?retryWrites=true&w=majority')

  return client

}