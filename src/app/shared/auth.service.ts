import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { TokenService } from "./token.service";

import { User } from "./user.model";

@Injectable()
export class AuthService{

    public constructor(private tokenService: TokenService){ }

    public signUp(user: User):Observable<Response>{
        return this.tokenService.registerAccount(user as any)
        .catch(this.hendleErrors);
    }

    public signIn(uid: string, password: string): Observable<Response>{
        //call Angular2-Token SignIn methed here!
        //return Observable<Response>                
        let signInData = {
            email : uid,
            password : password
        }

        return this.tokenService.signIn(signInData)
            .catch(this.hendleErrors);
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