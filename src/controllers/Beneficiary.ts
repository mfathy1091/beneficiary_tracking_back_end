import { NextFunction, Request, Response } from 'express'
import BeneficiaryModel from '../models/Beneficiary'

import { BaseBeneficiary } from '../models/Beneficiary'

const beneficiaryModel = new BeneficiaryModel()

const index = async (_req: Request, res: Response, next:NextFunction) => {
    try {
        const beneficiaries = await beneficiaryModel.index()
        res.json(beneficiaries)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const product = await beneficiaryModel.show(req.params.productId)
        res.json(product)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const beneficiary: Omit<BaseBeneficiary, 'id'> = {
        name: req.body.name,
        file_id: req.body.file_id,
    }
    try {
        const newBeneficiary = await beneficiaryModel.create(beneficiary)
        res.status(201)
        res.json(newBeneficiary)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const beneficiary: Omit<BaseBeneficiary, "id"> = {
        name: req.body.name,
        file_id: req.body.file_id,
    }
    try {
        const updatedBeneficiary = await beneficiaryModel.update(req.params.beneficiaryId, beneficiary)
        res.json(updatedBeneficiary)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deletedBeneficiary = await beneficiaryModel.delete(req.params.beneficiaryId)
        res.json(deletedBeneficiary)
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
}