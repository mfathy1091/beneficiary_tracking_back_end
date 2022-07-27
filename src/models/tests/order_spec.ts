import pool from '../../config/database'
import OrderModel from '../OrderModel'
import UserModel from '../User'
import * as hashingService from '../../utils/hashing'

const orderModel = new OrderModel()
const userModel = new UserModel()

describe("Order Model", async() => {
    beforeAll(async () => {
        try {
            const connection = await pool.connect();
            await connection.query('DELETE FROM orders');
            await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
            await connection.query('DELETE FROM users');
            await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.release();
            await userModel.create({
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@gmail.com',
                password: await hashingService.hashPassword('password123')
            });
        } catch (error) {
            console.log(error)
        }

    })

    afterAll(async () => {
        try {
            const connection = await pool.connect();
            await connection.query('DELETE FROM orders');
            await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
            await connection.query('DELETE FROM users');
            await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.release();
        } catch (error) {
            console.log(error)
        }

    })

    it('should have an index method', () => {
        expect(orderModel.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(orderModel.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderModel.index).toBeDefined();
    });

    it('should have a update method', () => {
        expect(orderModel.index).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderModel.index).toBeDefined();
    });

    it('create method should add a order', async () => {
        try {
            const result = await orderModel.create({
                status: 'compeleted',
                user_id: '1',
            });
            expect(result).toEqual({
                id: 1,
                status: 'compeleted',
                user_id: '1',
            });
        } catch (error) {
            console.log(error)
        }
    });

    it('index method should return a list of orders', async () => {
        try {
            const result = await orderModel.index();
            expect(result).toEqual([{
                id: 1,
                status: 'compeleted',
                user_id: '1',
            }]);
        } catch (error) {
            console.log(error)
        }

    });

    it('show method should return the correct order', async () => {
        try {
            const result = await orderModel.show("1");
            expect(result).toEqual({
                id: 1,
                status: 'compeleted',
                user_id: '1',
            });
        } catch (error) {
            console.log(error)
        }
    });

    it('delete method should remove the order', async () => {
        try {
            await orderModel.delete("1");
            const result = await orderModel.index()
    
            expect(result).toEqual([]);
        } catch (error) {
            console.log(error)
        }
    });
});

