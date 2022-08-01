import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/ProductModel'

import Product from '../types/product'

const productModel = new ProductModel()

const index = async (_req: Request, res: Response, next:NextFunction) => {
    try {
        const products = await productModel.index()
        res.json(products)
    } catch (err) {
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const product = await productModel.show(req.params.productId)
        res.json(product)
    } catch (err) {
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
    }
    try {
        const newProduct = await productModel.create(product)
        res.status(201)
        res.json(newProduct)
    } catch(err) {
        next(err) 
    }
}

const update = async (req: Request, res: Response, next:NextFunction) => {
    const product: Omit<Product, "id"> = {
        name: req.body.name,
        price: req.body.price,
    }
    try {
        const newProduct = await productModel.update(req.params.productId, product)
        res.json(newProduct)
    } catch(err) {
        next(err)    
    }
}

const destroy = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const deleted = await productModel.delete(req.params.productId)
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