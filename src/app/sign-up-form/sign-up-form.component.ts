import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'sign-up-form',
    templateUrl: 'sign-up-form.component.html'    
})

export class SignUpFormComponent{
    private userForm: FormGroup;

    public constructor(
        private formBuilder:FormBuilder
    ){
        this.userForm = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(100)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
            passwordConfirmation: [null, [Validators.required]]
        })
    }

    public signUpUser(){
        console.log("Form Sign Up enviado");
        console.log(this.userForm.value);
    }
}