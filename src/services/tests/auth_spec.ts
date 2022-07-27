import AuthService from '../Auth'
import UserModel from '../../models/User'
import pool from '../../config/database'
import User from '../../types/user'
import * as hashingService from '../../utils/hashing'

const userModel = new UserModel()
const authService = new AuthService();

describe('Authentication Module', () => {
    it('login method exists', () => {
        expect(authService.login).toBeDefined();
    });

    let user: User

    beforeAll(async () => {
        try {
            const connection = await pool.connect();
            await connection.query('DELETE FROM users');
            await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.release();
            
            user = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@gmail.com',
                password: await hashingService.hashPassword('password123')
            }
            await userModel.create(user);
        } catch (error) {
            console.log(error)
        }
    })

    afterAll(async () => {
        try {
            const connection = await pool.connect();
            await connection.query('DELETE FROM users');
            await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.release();
        } catch (error) {
            console.log(error)
        }
    })

    it('login method returns the auth user', async() => {
        try {
            const authUser = await authService.login(user.email, 'password123')            
            expect(authUser).not.toBe(null)
            expect(authUser?.email).toEqual(user.email)
            const isPasswordValid = await hashingService.isPasswordValid('password123', user.password as string)
            expect(isPasswordValid).toBeTrue();
        } catch (error) {
            console.log(error)
        }
    });

    it('login method returns null when credentials are wrong', async() => {
        try {
            const authUser = await authService.login(user.email, 'wrongpassword')
            expect(authUser).toBe(null)
        } catch (error) {
            console.log(error)
        }
    });



})