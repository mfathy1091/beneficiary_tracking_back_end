import pool from "../config/db.config";
import UserModel, { BaseUser } from '../models/User'

const userModel = new UserModel();

export default class UserService {
    async findByUsername(username: string): Promise<BaseUser | null> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)'
            const result = await connection.query(sql, [username])
            const user = result.rows[0];
    
            if(result.rows.length > 0){
                return result.rows[0];
            }else{
                return null
            }
    
        } catch (err) {
            throw new Error(`Could not get users. Error:  ${(err as Error).message}`)
        }
    }
    
}

