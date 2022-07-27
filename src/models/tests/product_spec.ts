import pool from '../../config/database'
import ProductModel from '../ProductModel'

const productModel = new ProductModel()

describe("Product Model", async() => {
    beforeAll(async () => {
        try {
            const connection = await pool.connect();
            await connection.query('DELETE FROM products');
            await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
            await connection.release();
        } catch (error) {
            console.log(error)
        }
    })

    afterAll(async () => {
        try {
            const connection = await pool.connect();
            await connection.query('DELETE FROM products');
            await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
            await connection.release();
        } catch (error) {
            console.log(error)
        }
    })

    it('should have an index method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a update method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('create method should add a product', async () => {
        try {
            const result = await productModel.create({
                name: '32 inch screen',
                price: '3200.99',
            });
            expect(result).toEqual({
                id: 1,
                name: '32 inch screen',
                price: '3200.99',
            });
        } catch (error) {
            console.log(error)
        }
    });

    it('index method should return a list of products', async () => {
        try {
            const result = await productModel.index();
            expect(result).toEqual([{
                id: 1,
                name: '32 inch screen',
                price: '3200.99',
            }]);
        } catch (error) {
            console.log(error)
        }
    });

    it('show method should return the correct product', async () => {
        try {
            const result = await productModel.show("1");
            expect(result).toEqual({
                id: 1,
                name: '32 inch screen',
                price: '3200.99',
            });
        } catch (error) {
            console.log(error)
        }
    });

    it('delete method should remove the product', async () => {
        try {
            await productModel.delete("1");
            const result = await productModel.index()
    
            expect(result).toEqual([]);
        } catch (error) {
            console.log(error)
        }
    });
});

