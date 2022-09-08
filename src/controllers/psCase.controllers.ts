import { NextFunction, Request, Response } from 'express'
import PsCaseModel from '../models/PsCase'

import { BasePsCase } from '../models/PsCase'
import { psCaseService } from '../services/PsCaseService'

const psCaseModel = new PsCaseModel()

const index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const psCases = await psCaseModel.index()
        res.json(psCases)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const psCase = await psCaseService.getOne(Number(req.params.psCaseId))
        res.json(psCase)
    } catch (err) {
        next(err)
    }
}


const create = async (req: Request, res: Response, next: NextFunction) => {
    const psCase: Omit<BasePsCase, 'id'> = {
        referral_source: req.body.referral_source,
        employee_id: req.body.employee_id,
    }
    try {
        const newPsCase = await psCaseModel.create(psCase)
        res.status(201)
        res.json(newPsCase)
    } catch (err) {
        next(err)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const psCase: Omit<BasePsCase, "id"> = {
        referral_source: req.body.referral_source,
        employee_id: req.body.employee_id,
    }
    try {
        const updatedPsCase = await psCaseModel.update(Number(req.params.psCaseId), psCase)
        res.json(updatedPsCase)
    } catch (err) {
        next(err)
    }
}

const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedPsCase = await psCaseModel.delete(Number(req.params.psCaseId))
        res.json(deletedPsCase)
    } catch (err) {
        next(err)
    }
}

const addBeneficiary = async (_req: Request, res: Response, next: NextFunction) => {
    const psCaseId: number = Number(_req.params.psCaseId)
    const beneficiaryId: number = Number(_req.body.beneficiary_id)
    const isDirect: number = Number(_req.body.is_direct)

    try {
        const addedProduct = await psCaseService.addBeneficiary(isDirect, psCaseId, beneficiaryId)
        res.json(addedProduct)
    } catch (err) {
        next(err)
    }
}

const updateIsDirect = async (_req: Request, res: Response, next: NextFunction) => {
    const psCaseId: number = Number(_req.params.psCaseId)
    const beneficiaryId: number = Number(_req.params.beneficiaryId)
    const isDirect: number = Number(_req.body.is_direct)

    try {
        const updatedIsDirect = await psCaseService.updateIsDirect(psCaseId, beneficiaryId, isDirect)
        res.json({
            'is_direct': updatedIsDirect
        })
    } catch (err) {
        next(err)
    }
    
}

const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const psCase = await psCaseService.getOne(Number(req.params.psCaseId))
        res.json(psCase)
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
    updateIsDirect,
    getOne
}