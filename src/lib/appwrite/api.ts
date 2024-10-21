import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account,appwriteConfig,avatars, databases, storage } from "./config";
import { ID, ImageGravity, Query } from "appwrite";
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

    if(!currentUserAccount) throw Error;
    return currentUserAccount.documents[0];
  } catch (error) {
    console.log(error)
  }
}

export async function signOutUser(){
  try {
    const session = await account.deleteSession("current")
    return session;
  } catch (error) {
    console.log(error)
  }
}

//Creating the post, there are three function needed (fileUpload, filePreview and deletePost function)

//fileUpload function
export async function fileUplaod(file: File){
  try {
    const uploadFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadFile;
  } catch (error) {
    console.log(error)
  }
}
// Get file preview 
export function getFilePreview(fileId: string){
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      4000,
      4000,
    )

    if(!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error)
  }
}

//Delete File
export async function deleteFile(fileId: string){
  try {
    await storage.deleteFile(
      appwriteConfig.storageId,
      fileId
    )
  } catch (error) {
    console.log(error)
  }
}

//Creating post function housing the three functions
export async function createPost(post: INewPost){
try {
  const uploadFile = await fileUplaod(post.file[0]);
  
 if(!uploadFile) throw Error;

 const fileUrl = getFilePreview(uploadFile.$id)
 if(!fileUrl){
   await deleteFile(uploadFile.$id);
   throw Error;
 }

 const tags = post.tags?.replace(/ /g, "").split(" ,") || [];
 const newPost = await databases.createDocument(
  appwriteConfig.databaseId,
  appwriteConfig.postsCollectionId,
  ID.unique(),
  {
    creator:post.userId,
    caption:post.caption,
    imageUrl:fileUrl,
    imageId:uploadFile.$id,
    location:post.location,
    tags:tags
  }
 );

 if(!newPost){
  await deleteFile(uploadFile.$id);
  throw Error;
 }
 return newPost;
} catch (error) {
  console.log(error)
}
}

export async function getRecentPosts(){
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    )
    if(!posts) throw Error
    return posts
} 

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await fileUplaod(post.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(postId:string, likeArrays:string[]){
  try {
    const updatePost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes:likeArrays
      }
    )
    if(!updatePost) throw Error;
    return updatePost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(postId:string, userId:string){
  try {
    const updateSaves = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post:postId
      }
    )
    if(!updateSaves) throw Error;
    return updateSaves;
  } catch (error) {
    console.log(error)
  }
}

export async function deleteSavedPost(savesRecordId:string){
   try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savesRecordId
    )
    if(!statusCode) throw Error;
    return {status:'ok'}
   } catch (error) {
    console.log(error)
   }
}