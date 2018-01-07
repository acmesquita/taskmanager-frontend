import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { Angular2TokenService } from "angular2-token";

import { User } from "./user.model";

@Injectable()
export class AuthService{

    public constructor(private tokenService: Angular2TokenService){ }

    public signUp(user: User):Observable<Response>{
        return this.tokenService.registerAccount(user as any)
        .catch(this.hendleErrors);
    }

    public singIn(uid: string, password: string){
        //call Angular2-Token SignIn methed here!
        //return Observable<Response>                
    }

    public signOut(): Observable<Response>{
        //call Angular2-Token SignOut methed here!      
        //return Observable<Response>
        return this.tokenService.signOut()
        .catch(this.hendleErrors);
    }

    public userSignedIn():boolean{
        //call Angular2-Token userSignedIn methed here!
        // return a Boolean 
        return this.tokenService.userSignedIn();
    }

    private hendleErrors(error: Response) {
        console.log("Salvando em algum lugar o erro", error);
        return Observable.throw(error);
    }
}