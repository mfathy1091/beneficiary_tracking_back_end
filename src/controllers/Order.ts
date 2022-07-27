import { Request, Response, NextFunction } from 'express'
import OrderModel from '../models/OrderModel'
import Order from '../types/order'

const orderModel = new OrderModel()

const index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.index()
        res.json(orders)
    } catch (err) {
        next(err)
    }

}

const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderModel.show(req.params.orderId)
        res.json(order)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id,
    }
    try {
        const newOrder = await orderModel.create(order)
        res.status(201)
        res.json(newOrder)
    } catch(err) {
        next(err)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id,
    }
    try {
        const updatedOrder = await orderModel.update(req.params.orderId, order)
        res.json(updatedOrder)
    } catch(err) {
        next(err)
    }
}

const destroy = async (req: Request, res: Response, next: NextFunction) => {
try {
    const deleted = await orderModel.delete(req.params.orderId)
    res.json(deleted)
    } catch (err) {
        next(err)
    }
}

const addProduct = async (req: Request, res: Response, next:NextFunction) => {
    const orderId: string = req.params.orderId  // getting orderId from params
    const productId: string = req.body.productId
    const quantity: string = req.body.quantity
    
    try {
        const addedProduct = await orderModel.addProduct(orderId, productId, quantity)
        console.log(addedProduct)
        res.json(addedProduct)
        res.status(201)
    } catch(err) {
        next(err)    
    }
}

const getCurrentOrder = async (req: Request, res: Response, next:NextFunction) => {
    const orderId: string = req.params.orderId  // getting orderId from params
    const productId: string = req.body.productId
    const quantity: string = req.body.quantity
    
    try {
        const addedProduct = await orderModel.addProduct(orderId, productId, quantity)
        console.log(addedProduct)
        res.json(addedProduct)
        res.status(201)
    } catch(err) {
        next(err)    
    }
}

export {
    index,
    show,
    create,
    update,
    destroy,
    addProduct
}