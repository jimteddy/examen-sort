import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Response } from "express";
import { Observable } from "rxjs";

@Injectable()
export class SessionGuard implements CanActivate {

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse()
    
    if(request.session.connected) return true
    
    res.redirect("/client/login")
    return false
  }
}