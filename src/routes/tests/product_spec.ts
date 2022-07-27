import pool from '../../config/database'
import * as hashingService from '../../utils/hashing'

import UserModel from '../../models/User'

import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const userModel = new UserModel()

describe('Test Product Endpoints', () => {
    let user;
    let token: string;
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
    
            const res = await request.post('/api/auth/login')
            .send({
                email: 'john@gmail.com',
                password: 'password123'
            });
            token = res.body.token
        } catch (error) {
            console.log(error)
        }
    })

    afterAll(async () => {
        try {
            const connection = await pool.connect();
            await connection.query('DELETE FROM users');
            await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.query('DELETE FROM products');
            await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
            await connection.release();
        } catch (error) {
            console.log(error)
        }
    })


    it('Index endpoint retruns 200, when token is provided', async () => {
        try {
            const res = await request.get('/api/products/')
            expect(res.status).toBe(200);
        } catch (error) {
            console.log(error)
        }
    });





    it('Create endpoint retruns 401, when token is not provided', async () => {
        try {
            const res = await request.post('/api/products/').send({           
                name: '32 inch screen',
                price: '3200.99',
            })
    
            expect(res.status).toBe(401);
        } catch (error) {
            console.log(error)
        }
    });

    it('Create endpoint', async () => {
        try {
            const res = await request.post('/api/products/').send({           
                name: '32 inch screen',
                price: '3200.99',
            })
            .set('Authorization', `Bearer ${token}`);
    
            expect(res.status).toBe(201);
            expect(res.body.id).toBe(1);
        } catch (error) {
            console.log(error)
        }
    });

    it('Update endpoint', async () => {
        try {
            const res = await request.put('/api/products/1').send({           
                name: '32 inch screen',
                price: '5200.99',
            }).set('Authorization', `Bearer ${token}`);
    
            expect(res.body.price).toBe('5200.99');
        } catch (error) {
            console.log(error)
        }
    });

    it('Delete endpoint', async () => {
        try {
            const res = await request.delete('/api/products/1')
            .set('Authorization', `Bearer ${token}`);
            expect(res.body.id).toBe(1);
        } catch (error) {
            console.log(error)
        }
    });

});
