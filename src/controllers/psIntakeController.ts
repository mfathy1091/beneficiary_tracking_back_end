import { NextFunction, Request, Response } from 'express'
import PsIntakeModel from '../models/PsIntake'

import { BasePsIntake } from '../models/PsIntake'
import { psIntakeService } from '../services/PsIntakeService'

const psIntakeModel = new PsIntakeModel()

const index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const psIntakes = await psIntakeModel.index()
        res.json(psIntakes)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const psIntake = await psIntakeService.getOne(Number(req.params.psIntakeId))
        res.json(psIntake)
    } catch (err) {
        next(err)
    }
}


const create = async (req: Request, res: Response, next: NextFunction) => {
    const psIntake: Omit<BasePsIntake, 'id'> = {
        referral_source: req.body.referral_source,
        employee_id: req.body.employee_id,
    }
    try {
        const newPsIntake = await psIntakeModel.create(psIntake)
        res.status(201)
        res.json(newPsIntake)
    } catch (err) {
        next(err)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const psIntake: Omit<BasePsIntake, "id"> = {
        referral_source: req.body.referral_source,
        employee_id: req.body.employee_id,
    }
    try {
        const updatedPsIntake = await psIntakeModel.update(Number(req.params.psIntakeId), psIntake)
        res.json(updatedPsIntake)
    } catch (err) {
        next(err)
    }
}

const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedPsIntake = await psIntakeModel.delete(Number(req.params.psIntakeId))
        res.json(deletedPsIntake)
    } catch (err) {
        next(err)
    }
}

const addBeneficiary = async (_req: Request, res: Response, next: NextFunction) => {
    const psIntakeId: number = Number(_req.params.psIntakeId)
    const beneficiaryId: number = Number(_req.body.beneficiary_id)
    const isDirect: number = Number(_req.body.is_direct)

    try {
        const addedProduct = await psIntakeService.addBeneficiary(isDirect, psIntakeId, beneficiaryId)
        res.json(addedProduct)
    } catch (err) {
        next(err)
    }
}

const updateIsDirect = async (_req: Request, res: Response, next: NextFunction) => {
    const psIntakeId: number = Number(_req.params.psIntakeId)
    const beneficiaryId: number = Number(_req.params.beneficiaryId)
    const isDirect: number = Number(_req.body.is_direct)

    try {
        const updatedIsDirect = await psIntakeService.updateIsDirect(psIntakeId, beneficiaryId, isDirect)
        res.json({
            'is_direct': updatedIsDirect
        })
    } catch (err) {
        next(err)
    }
}


export {
    index,
    show,
    create,
    update,
    destroy,
    addBeneficiary,
    updateIsDirect
}