import conf from "../conf.js";
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug ,
                {
                    title, 
                    content, 
                    featuredImage,
                    status, 
                    userId,
                }
            )
        } catch (error) {
            console.log("Error in create post.")
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, 
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("update post error");
        }
    }

    async deleteDocument (slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("error in deleteDocument.")
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("get post error")
            return false;
        }
    }

    async getPost(queries= [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("getPost Error..")
            return false
        }
    }

    //file upload method/service
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("upload file error")
            return true;
        }
    }

    //delete file
    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("delete file error.")
            return false;
        }
    }

    //file preview
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}


const service = new service()
export default service()