import pool from '../config/db.config'

export type BaseBeneficiary = {
    id?: number,
    name: string,
    file_id: number
}

export default class BeneficiaryModel {
    async index(): Promise<BaseBeneficiary[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM beneficiaries`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get beneficiaries  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }


    async show(id: number): Promise<BaseBeneficiary> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM beneficiaries WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get beneficiary. Error:  ${(err as Error).message}`)
        }
    }

    async create(beneficiary: BaseBeneficiary): Promise<BaseBeneficiary> {
        try {

            const conn = await pool.connect()
            const sql = 'INSERT INTO beneficiaries (name, file_id) VALUES($1, $2) RETURNING *'
            const result = await conn.query(sql, [beneficiary.name, beneficiary.file_id])
            const newBeneficiary = result.rows[0]

            conn.release()

            return newBeneficiary
        } catch (err) {
            console.log(err)
            throw new Error(`unable create beneficiary (${beneficiary.name}): ${(err as Error).message} `)
        }
    }


    async update(beneficiaryId: number, beneficiary: BaseBeneficiary): Promise<BaseBeneficiary> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE beneficiaries SET name = $1, file_id = $2 WHERE id = $3 RETURNING *";
            const result = await connection.query(sql, [beneficiary.name, beneficiary.file_id, beneficiaryId]);
            connection.release();
            const updatedBeneficiary = result.rows[0];
            return updatedBeneficiary;
        } catch (err) {
            throw new Error(`Could not update beneficiary. Error:  ${(err as Error).message}`)
        }
    }

    async delete(beneficiaryId: number): Promise<BaseBeneficiary> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM beneficiaries WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [beneficiaryId]);
            connection.release();
            const deletedBeneficiary = result.rows[0];
            return deletedBeneficiary;
        } catch (err) {
            throw new Error(`Could not delete beneficiary ${beneficiaryId}. Error:  ${(err as Error).message}`)
        }
    }



}

