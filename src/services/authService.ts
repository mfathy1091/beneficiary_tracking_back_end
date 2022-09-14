
import jwt from 'jsonwebtoken'
import UserModel, { BaseUser } from '../models/User'
import EmployeeModel from '../models/Employee';
import UserService from './userService'
import bcrypt from 'bcrypt'
import pool from '../config/db.config';
import tokenService from '../helpers/createToken';

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
  async register(user: BaseUser) {
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

  async signIn2(id: number): Promise<BaseUser | null> {
    try {
      // (1) Check if user exists
      const conn = await pool.connect()
      const sql = `
                SELECT 
                    users.username, users.password,
                    roles.role_name,
                    employees.name, employees.email, employees.avatar_url
                FROM users 
                Join roles ON users.role_id = roles.id
                Join employees ON users.id = employees.user_id
                WHERE id=($1)
                `

      const result = await conn.query(sql, [id])
      if (result.rows.length) {
        return result.rows[0]
      } else {
        return null
      }

    } catch (err) {
      throw new Error(`Cannot find user: ${(err as Error).message}`);
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

  async getUser(username: string): Promise<any> {
    try {

      const conn = await pool.connect()
      const sql = `
                SELECT 
                    users.id, users.username, users.password,
                    roles.role_name,
                    employees.name, employees.email, employees.avatar_url
                FROM users 
                Join roles ON users.role_id = roles.id
                Join employees ON users.id = employees.user_id
                WHERE username=($1)
                `
      const result = await conn.query(sql, [username])

      if (result.rows.length) {
        return result.rows[0];
      }else{
        return null;
      }
    } catch (err) {
      throw new Error(`${(err as Error).message}`);
    }
  }

  async getAuthUser(userId: number): Promise<any> {
    try {
      // (1) get user WITHOUT PASSWORD
      const conn = await pool.connect()
      const sql = `
          SELECT 
              users.id, users.username,
              roles.role_name,
              employees.name, employees.email, employees.avatar_url
          FROM users 
          Join roles ON users.role_id = roles.id
          Join employees ON users.id = employees.user_id
          WHERE users.id=($1)
          `

      const result = await conn.query(sql, [userId])
      return result.rows[0]

    } catch (err) {
      throw new Error(`Cannot get user: ${(err as Error).message}`);
    }
  }

  generateToken(user: BaseUser): string {
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as unknown as string);
    return token;
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

  async isPasswordValid(password: string, hash: string) {
    try {
      const isPasswordValid = await bcrypt.compare(password + pepper, hash)
      return isPasswordValid
    } catch (error) {
      console.log(error)
    }
  }


}

