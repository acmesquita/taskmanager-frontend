import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormUtils } from "../shared/form.utils";


@Component({
    selector: 'sign-up-form',
    templateUrl: 'sign-up-form.component.html'    
})

export class SignUpFormComponent{
   
    private form: FormGroup;
    private formUtils: FormUtils;

    public constructor(
        private formBuilder:FormBuilder
    ){
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
            passwordConfirmation: [null, [Validators.required]]
        },{ validator: this.passwordConfirmationValidator});
        this.formUtils = new FormUtils(this.form);
    }

    public signUpUser(){
        console.log("Form Sign Up enviado");
        console.log(this.form.value);
    }

    private passwordConfirmationValidator(formGroup: FormGroup): any {
        if(formGroup.get('password').dirty && formGroup.get('passwordConfirmation').dirty && formGroup.get('password').value === formGroup.get('passwordConfirmation').value){
            formGroup.get('passwordConfirmation').setErrors(null);
        }
        else{
            formGroup.get('passwordConfirmation').setErrors({'mismatch':true});            
        }
    }
}