import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUsers = async (name, Email, Password) =>{

    if (!name || !Email || !Password){
        const error = new TypeError('Name, Email and Password are required.');
        error.statusCode = 400;
        throw error;
    }

    if(name.trim() === '' ||
       Email.trim() === '' ||
         Password.trim() === ''){
            const error = new TypeError('Name, Email and Password are required.');
            error.statusCode = 400;
            throw error;
         }

         if(!validator.isEmail(Email)){
            const error = new TypeError('Invalid email address.')
            error.statusCode = 400;
            throw error;
         }

         if(!validator.isStrongPassword(Password)){
            const error = new TypeError('Password is not strong enough.')
            error.statusCode = 400;
            throw error;
         }

         const [user] = await pool.query("SELECT email FROM tbluser WHERE email = ?", [Email]);

         if(user.length === 1){
            const error = new Error(`The Email ${Email} is already in used.`);
            error.statusCode = 400;
            throw error;
         }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(Password, salt);

        const [newUser] = await pool.query("INSERT INTO tbluser (Name, Email, Password) VALUES (?, ?, ?)",
        [name, Email, hashedPassword]
        );

        return newUser;


}

export default {
    createUsers
}

export const login = async (Email, Password) => {
    if(Email.trim() === '' || Password.trim() === ''){
        const error = new Error('Email and Password are required.')
        error.statusCode = 400;
        throw error;
    }   

        const [user] = await pool.query("SELECT * FROM tbluser WHERE Email = ?", [Email]);
        console.log(user);
            if(user.length === 0){const error = new Error(`An account with the email ${Email} does not exist.`)
            error.statusCode = 400;
            throw error;
    }

    if(!bcrypt.compareSync(Password, user[0].Password)){
        const error = new Error('Incorrect password.');
        error.statusCode = 400;
        throw error;
    }   
    
    const token = jwt.sign({id: user[0].id}, process.env.SECRET,{expiresIn: '1d'});

    return token;

}

    export const getUsers = async (id) =>{
        if(parseInt(id) === NaN){
            throw new Error('Invalid ID.');

        const [user] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
        return user;
    }       
}
 



