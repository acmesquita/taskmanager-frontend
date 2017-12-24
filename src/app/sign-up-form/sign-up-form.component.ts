import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
import { FormUtils } from "../shared/form.utils";
import { User } from "../shared/user.model";

@Component({
    selector: 'sign-up-form',
    templateUrl: 'sign-up-form.component.html'    
})

export class SignUpFormComponent{
   
    private form: FormGroup;
    private formUtils: FormUtils;

    public constructor(
        public authService: AuthService,
        public formBuilder:FormBuilder,
        private router: Router
    ){
        this.setupForm();
        this.formUtils = new FormUtils(this.form);
    }

    public signUpUser(){
        this.authService.signUp(this.form.value as User)
        .subscribe(
            () => {
                alert('Parabéns, sua conta foi criada com sucesso!');
                this.router.navigate(['dashboard']);
            }
        );
    }

    private passwordConfirmationValidator(formGroup: FormGroup): any {
        if(formGroup.get('password').dirty && formGroup.get('passwordConfirmation').dirty && formGroup.get('password').value === formGroup.get('passwordConfirmation').value){
            formGroup.get('passwordConfirmation').setErrors(null);
        }
        else{
            formGroup.get('passwordConfirmation').setErrors({'mismatch':true});            
        }
    }

    private setupForm(){
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
            passwordConfirmation: [null, [Validators.required]]
        },{ validator: this.passwordConfirmationValidator});

    }
}