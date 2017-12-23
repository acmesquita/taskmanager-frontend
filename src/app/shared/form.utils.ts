import { FormGroup } from "@angular/forms";

export class FormUtils{

    public constructor(private form: FormGroup){}
    
    public showFieldError(fieldName: string): boolean{
        let field = this.getField(fieldName);
        return field.invalid && (field.touched || field.dirty)
    }
    
    public fieldClassForErrorOrSuccess(fieldName: string): any{
        return {
            "has-error": this.showFieldError(fieldName),
            "has-success": this.getField(fieldName).valid
        }
    }

    public iconClassForErrorOrSuccess(fieldName: string): any{
        return {
            "glyphicon-remove": this.showFieldError(fieldName),
            "glyphicon-ok": this.getField(fieldName).valid
        }
    }

    public getField(fieldName: string){
        return this.form.get(fieldName);
    }

}