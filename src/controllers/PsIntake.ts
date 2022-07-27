import { NextFunction, Request, Response } from 'express'
import PsIntakeModel from '../models/PsIntake'

import { BasePsIntake } from '../models/PsIntake'
import { psIntakeService } from '../services/PsIntake'

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
        const psIntake = await psIntakeModel.show(Number(req.params.psIntakeId))
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
    const psIntakeId: string = _req.params.psIntakeId
    const beneficiaryId: string = _req.body.beneficiaryId
    const isDirect: number = parseInt(_req.body.isDirect)

    try {
        const addedProduct = await psIntakeModel.addBeneficiary(isDirect, psIntakeId, beneficiaryId)
        res.json(addedProduct)
    } catch (err) {
        next(err)
    }
}


const getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const psIntake = await psIntakeService.getDetails(Number(req.params.psIntakeId))
        res.json(psIntake)
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
    getDetails,
}