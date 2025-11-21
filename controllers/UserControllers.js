import * as UserModel from "../models/UserModel.js";

export const register = async (req, res) =>{
    const {Name, Email, Password} = req.body;

    try{
        const user = await UserModel.createUsers(Name, Email, Password);
        res.status(201).json({
            success: true,
            message: [{result: "A new account has been created!"}]
        });
    }catch(e){
        console.log(e);
    }
}

export default {
    register
}

export const login = async (req, res, next) => {
    const {Email, Password} = req.body;

    try{
        const token = await UserModel.login(Email, Password);
        res.status(200).json({
            success: true,
            message: [{result: "login successful", token}],
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }   
}