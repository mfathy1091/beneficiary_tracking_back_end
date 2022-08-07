import pool from '../config/db.config'

export type BasePsIntake = {
    id?: number,
    referral_source: string,
    employee_id: number
}

export default class PsIntakeModel {
    async index(): Promise<BasePsIntake[]> {
        const connection = await pool.connect();
        try {
            const sql = `SELECT * FROM ps_intakes`;
            const result = await connection.query(sql);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get psIntakes  ${(err as Error).message}`)
        } finally {
            connection.release();
        }
    }

    async create(psIntake: BasePsIntake): Promise<BasePsIntake> {
        try {

            const conn = await pool.connect()
            const sql = 'INSERT INTO ps_intakes (referral_source, employee_id) VALUES($1, $2) RETURNING *'
            const result = await conn.query(sql, [psIntake.referral_source, psIntake.employee_id])
            const newPsIntake = result.rows[0]

            conn.release()

            return newPsIntake
        } catch (err) {
            console.log(err)
            throw new Error(`unable create psIntake (${psIntake.referral_source}): ${(err as Error).message} `)
        }
    }


    async update(psIntakeId: number, psIntake: BasePsIntake): Promise<BasePsIntake> {
        try {
            const connection = await pool.connect();
            const sql = "UPDATE ps_intakes SET referral_source = $1, employee_id = $2 WHERE id = $3 RETURNING *";
            const result = await connection.query(sql, [psIntake.referral_source, psIntake.employee_id, psIntakeId]);
            connection.release();
            const updatedPsIntake = result.rows[0];
            return updatedPsIntake;
        } catch (err) {
            throw new Error(`Could not update psIntake. Error:  ${(err as Error).message}`)
        }
    }

    async delete(psIntakeId: number): Promise<BasePsIntake> {
        try {
            const connection = await pool.connect();
            const sql = "DELETE FROM ps_intakes WHERE id=$1 RETURNING *";
            const result = await connection.query(sql, [psIntakeId]);
            connection.release();
            const deletedPsIntake = result.rows[0];
            return deletedPsIntake;
        } catch (err) {
            throw new Error(`Could not delete psIntake ${psIntakeId}. Error:  ${(err as Error).message}`)
        }
    }


}