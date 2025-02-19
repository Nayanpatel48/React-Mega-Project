import conf from "../conf/conf.js";
import {Client, Account, ID} from 'appwrite';


export class AuthService{
    //properties
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            //w use ID by appwrite to generate unique id
            const userAccount = await this.createAccount(ID.unique, email, password, name)
            
            //checking that user account is created or not
            if(userAccount){
                //call another method
                //user is created then login automatically
                this.login({email, password})
                
            } else {
                return userAccount;
            }
        } catch(error){
            console.log(error)
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("getCurrentUser Error error..")
        }

        return null
    }

    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout error.")
        }
    }
}

const authService = new AuthService();
export default { authService }; // Named export