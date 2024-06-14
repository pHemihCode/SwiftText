import { INewUser } from "@/types";
import { account,appwriteConfig,avatars, databases } from "./config";
import { ID, Query } from "appwrite";
export async function createUserAccount(user:INewUser){
  try {
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    )
    if(!newAccount) throw Error

    const avatarUrl = avatars.getInitials(user.name)
    const newUser = await saveNewUserToDB({
        accountId:newAccount.$id,
        name:newAccount.name,
        email:newAccount.email,
        username: user.username,
        imageUrl:avatarUrl,
    })
    return newUser; 
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function saveNewUserToDB(user:{
    accountId:string,
    email:string,
    name:string,
    imageUrl:URL,
    username?:string
}){
  try {
    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        user,
    )
    return newUser
  } catch (error) {
    console.log(error)
    return error
  }
}
export async function signInUser(user:{email:string; password:string}){
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentUser(){
  try {
    const currentUser = await account.get();
    if(!currentUser) throw new Error;

    const currentUserAccount = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentUser.$id)] 
    )

    if(!currentUserAccount) throw new Error;
    return currentUserAccount.documents[0];
  } catch (error) {
    console.log(error)
  }
}