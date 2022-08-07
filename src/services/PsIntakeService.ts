import pool from "../config/db.config";
import PsIntakeModel, { BasePsIntake } from '../models/PsIntake'

const psIntakeModel = new PsIntakeModel();

type PsIntake = Omit<BasePsIntake, "employee_id"> & {
    employee?: { id: number; name: string };
    beneficiaries?: { id: number; name: string; is_direct: number }[];
};


async function getOne(psIntakeId: number): Promise<PsIntake> {
    const connection = await pool.connect();
    try {
        const result = await connection.query(
            `
            SELECT ps_intakes.id, ps_intakes.referral_source,
            employees.name as "employeeName",
            employees.id as "employeeId",
            beneficiary_ps_intakes.is_direct,
            beneficiaries.name as "beneficiaryName",
            beneficiaries.id as "beneficiaryId"
            FROM ps_intakes
            LEFT OUTER JOIN employees ON ps_intakes.employee_id = employees.id
            LEFT OUTER JOIN beneficiary_ps_intakes ON ps_intakes.id = beneficiary_ps_intakes.ps_intake_id
            LEFT OUTER JOIN beneficiaries ON beneficiaries.id = beneficiary_ps_intakes.beneficiary_id
            WHERE ps_intakes.id = $1;
        `,
            [psIntakeId]
        );

        if (result.rowCount === 0) throw new Error(`PS Intake ${psIntakeId} not found`);
        
        // return result.rows;
        return {
            id: result.rows[0].id,
            referral_source: result.rows[0].referral_source,
            employee: {
                id: result.rows[0].employeeId,
                name: result.rows[0].employeeName,
            },
            beneficiaries: result.rows.map((row) => ({
                id: row.beneficiaryId,
                name: row.beneficiaryName,
                is_direct: row.is_direct,
            })),
        };
    } finally {
        connection.release();
    }
}

// : Promise<Order>
async function addBeneficiary(isDirect: number, psIntakeId: number, beneficiaryId: number) {
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

async function removeBeneficiary(psIntakeId: number, beneficiaryId: number) {
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

async function updateIsDirect( psIntakeId: number, beneficiaryId: number, isDirect: number): Promise<void> {
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



export const psIntakeService = {
    getOne,
    addBeneficiary,
    removeBeneficiary,
    updateIsDirect,
    // add: courseModel.add,
    // remove: courseModel.remove,
    // update: courseModel.update,
};