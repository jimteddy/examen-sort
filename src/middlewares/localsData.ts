import { Request, Response, NextFunction } from "express";

export async function localsData(req: any, res: Response, next: NextFunction){
    const obj = {
      'connected': req.session.connected,
      'user': req.session.client,
    }
    res.locals = obj
    next()
}
