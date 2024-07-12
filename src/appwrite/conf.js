import config from '../conf/config.js';
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service {
   client = new Client();
   databases;
   bucket;
   account;

   constructor() {
      this.client
         .setEndpoint(config.appwriteUrl)
         .setProject(config.appwriteProjectId);
      this.databases = new Databases(this.client);
      this.bucket = new Storage(this.client);
      this.account = new Account(this.client);
   }

   async isAuthenticated() {
      try {
         const user = await this.account.get();
         console.log("Authenticated user:", user);
         return user;
      } catch (error) {
         console.log("Appwrite service :: isAuthenticated :: error", error);
         return false;
      }
   }

   async createPost({ title, slug, content, featuredImage, status, userId }) {
      try {
         return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
               title,
               content,
               featuredImage,
               status,
               userId,
            }
         );
      } catch (error) {
         console.log("Appwrite service :: createPost :: error", error);
      }
   }

   async updatePost(slug, { title, content, featuredImage, status }) {
      try {
         return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
               title,
               content,
               featuredImage,
               status,
            }
         );
      } catch (error) {
         console.log("Appwrite service :: updatePost :: error", error);
      }
   }

   async deletePost(slug) {
      try {
         await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
         );
         return true;
      } catch (error) {
         console.log("Appwrite service :: deletePost :: error", error);
         return false;
      }
   }

   async getPost(slug) {
      try {
         return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug  
         );
      } catch (error) {
         console.log("Appwrite service :: getPost :: error", error);
         return false;
      }
   }

   async getPosts(queries = "active") {
      try {
         return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries

         );
      } catch (error) {
         console.log("Appwrite service :: getPosts :: error", error);
         return false;
      }
   }

   // File upload service

   async uploadFile(file) {
      try {
         const user = await this.isAuthenticated();
         if (!user) {
            throw new Error("User not authenticated");
         }
         console.log('Uploading file to bucket:', config.appwriteBucketId);
         const response = await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
         );
         console.log("File uploaded successfully", response);
         return response;
      } catch (error) {
         console.log("Appwrite service :: uploadFile :: error", error);
         return false;
      }
   }

   async deleteFile(fileId) {
      try {
         await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
         );
         return true;
      } catch (error) {
         console.log("Appwrite service :: deleteFile :: error", error);
         return false;
      }
   }

   getFilePreview(fileId) {
      return this.bucket.getFilePreview(
         config.appwriteBucketId,
         fileId
      );
   }
}

const service = new Service();
export default service;
