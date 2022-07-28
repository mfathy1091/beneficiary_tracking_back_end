import pool from '../config/database'

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

    async show(id: number): Promise<BasePsIntake> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM ps_intakes WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get ps_intakes. Error:  ${(err as Error).message}`)
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
    // : Promise<Order>
    async addBeneficiary(isDirect: number, psIntakeId: number, beneficiaryId: number) {
        try {
            const sql = 'INSERT INTO beneficiary_ps_intakes (is_direct, ps_intake_id, beneficiary_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await pool.connect()

            const result = await conn
                .query(sql, [isDirect, psIntakeId, beneficiaryId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add beneficiary ${beneficiaryId} to ps intake ${psIntakeId}: ${err}`)
        }
    }

    async removeBeneficiary(psIntakeId: number, beneficiaryId: number) {
        try {
            const sql = "DELETE FROM beneficiary_ps_intakes WHERE beneficiary_id=$1 AND ps_intake_id=$2 RETURNING *";
            //@ts-ignore
            const conn = await pool.connect()

            const result = await conn
                .query(sql, [beneficiaryId, psIntakeId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add beneficiary ${beneficiaryId} to ps intake ${psIntakeId}: ${err}`)
        }
    }

    async updateIsDirect( psIntakeId: number, beneficiaryId: number, isDirect: number): Promise<void> {
        const connection = await pool.connect();
        try {
            const result = await connection.query(
                "UPDATE beneficiary_ps_intakes SET is_direct = $1 WHERE ps_intake_id = $2 AND beneficiary_id = $3 RETURNING *;",
                [isDirect, psIntakeId, beneficiaryId]
            );
            return result.rows[0].is_direct
        } catch (err) {
            throw new Error(`Failed to update is_direct for beneficiary ${beneficiaryId} in ps intake ${psIntakeId}: ${err}`);
        } finally {
            connection.release();
        }
    }

    async addService(isDirect: number, psIntakeId: number, beneficiaryId: number) {
        try {
            const sql = 'INSERT INTO beneficiary_ps_intakes (is_direct, ps_intake_id, beneficiary_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await pool.connect()

            const result = await conn
                .query(sql, [isDirect, psIntakeId, beneficiaryId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add beneficiary ${beneficiaryId} to ps intake ${psIntakeId}: ${err}`)
        }
    }

}