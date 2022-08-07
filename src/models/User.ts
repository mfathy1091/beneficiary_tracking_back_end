import pool from '../config/db.config';
export type BaseUser = {
    id?: number,
    username: string,
    password: string
}

export default class UserModel {

    async index(): Promise<BaseUser[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT id, username FROM users`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async show(id: string): Promise<BaseUser> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get users. Error:  ${(err as Error).message}`)
        }
    }

    async create(user: BaseUser): Promise<BaseUser> {
        try {
            
            const conn = await pool.connect()
            const sql = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING id, username'
            const result = await conn.query(sql, [user.username, user.password])
            const newUser = result.rows[0]

            conn.release()

            return newUser
        } catch (err) {
            console.log(err)
            throw new Error(`unable create user (${user.username}): ${(err as Error).message} `)
        }
    }


    async update(userId: string, user: BaseUser): Promise<BaseUser> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE users SET username = $1, password = $2 WHERE id=$3 RETURNING *";
            const result = await connection.query(sql, [user.username, user.password, userId]);
            connection.release();
            const updatedUser = result.rows[0];
            return updatedUser;
        } catch (err) {
            throw new Error(`Could not update user. Error:  ${(err as Error).message}`)
        }
    }

    async delete(userId: string): Promise<BaseUser> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [userId]);
            connection.release();
            const deletedUser = result.rows[0];
            return deletedUser;
        } catch (err) {
            throw new Error(`Could not delete user ${userId}. Error:  ${(err as Error).message}`)
        }
    }

}
