import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
import { FormUtils } from "../shared/form.utils";
@Component({
    selector: 'sign-in-form',
    templateUrl: 'sign-in-form.component.html'    
})

export class SignInFormComponent{

    public form: FormGroup;
    public formUtils: FormUtils;
    public submitted: boolean;
    public formErros: Array<string>;

    public constructor(
        public authService: AuthService,
        public formBuilder:FormBuilder,
        private router: Router){
            this.setupForm();
            this.submitted = false;
            this.formErros = null;
            this.formUtils = new FormUtils(this.form);
    }

    public signInUser(){
        this.submitted = true;
        this.authService.signIn(this.form.get('email').value, this.form.get('password').value)
        .subscribe(
            () => {
                this.router.navigate(['dashboard']);
                this.formErros = null;
            },
            (error) =>{
                this.submitted = false;
                //Erros nos dados
                if(error.status === 401){
                    this.formErros = JSON.parse(error._body).errors;
                    
                } else {
                    this.formErros = ["Erro no processamento, tente novamente mais tarde."]
                }
            }
        );
    }

    private setupForm(){
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email, Validators.minLength(8)]],
            password: [null, [Validators.required]]
        });
    }
}