import pool from "../config/database";
import { BasePsIntake } from '../models/PsIntake'



type PsIntake = Omit<BasePsIntake, "employee_id"> & {
    employee: { id: number; name: string };
    beneficiaries: { id: number; name: string; is_direct: number }[];
};


async function getDetails(psIntakeId: number): Promise<PsIntake> {
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
            INNER JOIN employees ON ps_intakes.employee_id = employees.id
            LEFT OUTER JOIN beneficiary_ps_intakes ON ps_intakes.id = beneficiary_ps_intakes.ps_intake_id
            LEFT OUTER JOIN beneficiaries ON beneficiaries.id = beneficiary_ps_intakes.beneficiary_id
            WHERE ps_intakes.id = $1;
        `,
            [psIntakeId]
        );

        if (result.rowCount === 0) throw new Error(`PS Intake ${psIntakeId} not found`);

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



export const psIntakeService = {
    getDetails,
    // setGrade,
    // add: courseModel.add,
    // remove: courseModel.remove,
    // update: courseModel.update,
};