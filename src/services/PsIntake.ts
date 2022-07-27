import pool from "../config/database";
import { BasePsIntake } from '../models/PsIntake'



type PsIntake = Omit<BasePsIntake, "employee_id"> & {
    employee: { id: number; name: string };
    beneficiaries: { id: number; name: string; is_direct: number }[];
};


async function getOne(psIntakeId: number): Promise<PsIntake> {
    const connection = await pool.connect();
    try {
        const result = await connection.query(
            `
            SELECT ps_intake.id, ps_intake.referral_source,
            employee.name as "employeeName",
            employee.id as "employeeId",
            beneficiary_ps_intakes.is_direct,
            beneficiary.name as "beneficiaryName",
            beneficiary.id as "beneficiaryId"
            FROM course INNER JOIN employee ON ps_intake.employee_id = employee.id
            LEFT OUTER JOIN beneficiary_ps_intakes ON ps_intake.id = beneficiary_ps_intakes.course_id
            LEFT OUTER JOIN beneficiary ON beneficiary.id = beneficiary_ps_intakes.beneficiary_id
            WHERE ps_intake.id = $1;
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