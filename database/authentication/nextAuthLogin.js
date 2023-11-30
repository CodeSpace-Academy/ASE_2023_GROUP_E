import client from "../client"

export default async function nextAuthLogin(credentials){

    const userscollection = client.db('authentication').collection('users')
    const user = await userscollection.findOne({ email: credentials.email})
    return user

}