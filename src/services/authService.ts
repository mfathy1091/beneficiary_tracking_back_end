
import jwt from 'jsonwebtoken'
import UserModel, {BaseUser} from '../models/User'
import EmployeeModel from '../models/Employee';
import UserService from './userService'
import bcrypt from 'bcrypt'
import pool from '../config/db.config';

const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD

const userModel = new UserModel();
const employeeModel = new EmployeeModel();
const userService = new UserService()

type CreateAccountParams = {
    username: string;
    plainTextPassword: string;
    role: "admin" | "psWorker";
    email: string,
    name: string;
};


export default class AuthService {
    async register(user: BaseUser){
        try {
            // (1) Hash the password
            const hashedPassword = (await this.hashPassword(user.password)) as unknown as string
            user.password = hashedPassword
            const newUser = await userModel.create(user)
            return newUser;
        } catch (err) {
            throw new Error(`Cannot create user: ${(err as Error).message}`);
        }
    }

    async resetPassword(userId: string, user: BaseUser): Promise<BaseUser> {
        try {
            // (1) Hash the password
            const hashedPassword = (await this.hashPassword(user.password)) as unknown as string

            const connection = await pool.connect();
            const sql = "UPDATE users SET password = $1 WHERE id=$2";
            const result = await connection.query(sql, [hashedPassword, userId]);
            connection.release();
            const updatedUser = result.rows[0];
            return updatedUser;
        } catch (err) {
            throw new Error(`Could not reset password. Error:  ${(err as Error).message}`)
        }
    }
    


    async authenticate(username: string, password: string): Promise<BaseUser | null> {
        try {
            // (1) Check if user exists
            const conn = await pool.connect()
            const sql = 'SELECT * FROM users WHERE username=($1)'
        
            const result = await conn.query(sql, [username])
            if(result.rows.length){
                const user = result.rows[0]
                // (2) Check if password is valid
                const isValid = await this.isPasswordValid(password, user.password);
                if(isValid){
                    return user
                }
            }
            return null
        } catch (err) {
            throw new Error(`Cannot authenticate user: ${(err as Error).message}`);
        }
    }

    generateToken(user: BaseUser): string{
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as unknown as string);
        return token;
    }

    verifyToken(token: string){
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
        } catch (error) {
            return error
        }    
    }


    async hashPassword(password: string) {
        try {
            const hashedPassword = await bcrypt.hash(
                password + pepper,
                parseInt(saltRounds as string)
            );
        
            return hashedPassword;
        } catch (error) {
            console.log(error)
        }
    }

    async isPasswordValid (password: string, hash: string) {
        try {
            const isPasswordValid = await bcrypt.compare( password+pepper, hash )
            return isPasswordValid
        } catch (error) {
            console.log(error)
        }
    }


}

