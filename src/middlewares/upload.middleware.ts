import fs from 'fs';
import { Request, Response, NextFunction } from 'express';


export default (req: Request, res: Response, next:NextFunction) => {
    // check file exists
    if(typeof req.file === 'undefined' || typeof req.body === 'undefined')
    return res.status(400).json({msg: "Problem with uploading image"})
    
    // use upload folder
    let image = req.file.path;

    // define file type
    if (
        !req.file.mimetype.includes('jpeg') && 
        !req.file.mimetype.includes('jpg') &&
        !req.file.mimetype.includes('png')
    ){
        // remove file from upload folder
        fs.unlinkSync(image);
        return res.status(400).json({msg: "This file is not supported"})
    }
    
    // define file size
    if(req.file.size > 1024 * 1024) {
        // remove file from upload folder
        fs.unlinkSync(image)
        return res.status(400).json({msg: "This file is too large (Max: 1MB)"})
    }
    // success
    next();
}