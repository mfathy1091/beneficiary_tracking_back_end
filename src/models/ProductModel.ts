import pool from '../config/db.config';
import Product from '../types/product'

export default class ProductModel {
    
    async index(): Promise<Product[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM products`;
            const result = await connection.query(sql);
            
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            return result.rows[0];
            connection.release();
        } catch (err) {
            throw new Error(`Could not get products. Error:  ${(err as Error).message}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const connection = await pool.connect();
            const sql = "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
            const result = await connection.query(sql, [product.name, product.price]);
            connection.release();
            const newProduct = result.rows[0];
            return newProduct;
        } catch (err) {
            throw new Error(`Could not create product. Error:  ${(err as Error).message}`)
        }
    }

    async update(productId: string, product: Omit<Product, "id">): Promise<Product> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE products SET name = $1, price = $2 WHERE id=$3 RETURNING *";
            const result = await connection.query(sql, [product.name, product.price, productId]);
            connection.release();
            const updatedProduct = result.rows[0];
            return updatedProduct;
        } catch (err) {
            throw new Error(`Could not update product. Error:  ${(err as Error).message}`)
        }
    }

    async delete(productID: string): Promise<Product> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM products WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [productID]);
            connection.release();
            const product = result.rows[0];
            return product;
        } catch (err) {
            throw new Error(`Could not delete product ${productID}. Error:  ${(err as Error).message}`)
        }
    }

}
