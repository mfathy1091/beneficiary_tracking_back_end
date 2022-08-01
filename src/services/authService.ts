
import pool from '../config/database';
import * as hashing from '../utils/hashing' 
import jwt from 'jsonwebtoken'
import { hashPassword } from '../utils/hashing'
import UserModel, {BaseUser} from '../models/User'
import EmployeeModel from '../models/Employee';
const userModel = new UserModel();
const employeeModel = new EmployeeModel();

type CreateAccountParams = {
    username: string;
    plainTextPassword: string;
    role: "admin" | "psWorker";
    email: string,
    name: string;
};

export default class AuthService {
    async register(params: CreateAccountParams){
        try {
            // (1) Hash the password
            const password = (await hashPassword(params.plainTextPassword)) as unknown as string
            const username = params.username
            const newUser = await userModel.create({ username, password })
            
            if(params.role === "admin" ) {
                const employee = await employeeModel.create({ name: params.name, email: params.email, user_id: Number(newUser.id) })
            }

        } catch (err) {
            throw new Error(`Cannot create user: ${(err as Error).message}`);
        }
    }

    async login(username: string, plainTextPassword: string): Promise<BaseUser | null> {
        const connection = await pool.connect();
        try {
            const sql = 'SELECT * FROM users WHERE username=($1)'
            const result = await connection.query(sql, [username])
            const user = result.rows[0];

            // if user exists
            if(user){ 
                const { password: hashedPassword } = user;
                
                // compare passwords
                const isPasswordValid = await hashing.isPasswordValid(plainTextPassword, hashedPassword)
                
                if(isPasswordValid === true){
                    return user
                }else{
                    return null
                }
            }else{
                return null
            }
        } catch (err) {            
            throw new Error(`Unable to login: ${(err as Error).message}`);
        }finally{
            connection.release();
        }
        
    }

}

