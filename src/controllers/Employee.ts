import { NextFunction, Request, Response } from 'express'
import EmployeeModel from '../models/Employee'

import { BaseEmployee } from '../models/Employee'

const employeeModel = new EmployeeModel()

const index = async (_req: Request, res: Response, next:NextFunction) => {
    try {
        const employees = await employeeModel.index()
        res.json(employees)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const product = await employeeModel.show(req.params.productId)
        res.json(product)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const employee: Omit<BaseEmployee, 'id'> = {
        name: req.body.name,
        email: req.body.email,
        user_id: req.body.user_id,
    }
    try {
        const newEmployee = await employeeModel.create(employee)
        res.status(201)
        res.json(newEmployee)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const employee: Omit<BaseEmployee, "id"> = {
        name: req.body.name,
        email: req.body.email,
        user_id: req.body.user_id,
    }
    try {
        const newEmployee = await employeeModel.update(req.params.employeeId, employee)
        res.json(newEmployee)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deleted = await employeeModel.delete(req.params.employeeId)
        res.json(deleted)
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