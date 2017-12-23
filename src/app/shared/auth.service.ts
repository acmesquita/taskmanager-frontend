import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { Angular2TokenService } from "angular2-token";

import { User } from "./user.model";

@Injectable()
export class AuthService{

    public constructor(private tokenService: Angular2TokenService){ }

    public signUp(user: User){
        //call Angular2-Token SignUp methed here!
        //return Observable<Response>
    }

    public singIn(uid: string, password: string){
        //call Angular2-Token SignIn methed here!
        //return Observable<Response>                
    }

    public signOut(){
        //call Angular2-Token SignOut methed here!        
        //return Observable<Response>
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