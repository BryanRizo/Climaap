import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateFormService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public isValidField(form: FormGroup, field: string, isSubmit: boolean): boolean | null  {
    // Verifica si hay errores a nivel de grupo que afecten a este campo
    const hasGroupErrors = form.errors && form.errors['ageRange'] && (field === 'edadFinal' || field === 'edadInicial') && isSubmit;
    return form.controls[field].errors && isSubmit || hasGroupErrors;
  }

  getFieldError( form: FormGroup, field: string ): string | null {

    if ( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};
    const groupErrors = form.errors || {}; // Errores a nivel de grupo

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
        return 'Este campo es requerido.';
      
      case 'maxlength':
        return `Máximo ${errors['maxlength'].requiredLength} caracteres permitidos.`;
        
      case 'minlength':
        return `Mínimo ${errors['minlength'].requiredLength} caracteres requeridos.`;
        
      case 'email':
        return 'El formato de correo electrónico no es válido.';
        
      case 'pattern':
        return 'El formato no es válido.';
        
      case 'min':
        return `El valor mínimo es ${errors['min'].min}.`;
        
      case 'max':
        return `El valor máximo es ${errors['max'].max}.`;
        
      case 'customError':
        return errors['customError']; 

        case 'maxTwoDigits':
          return `Solo se permiten hasta 2 dígitos.`

     
      }
    }

    if (field === 'edadFinal' && groupErrors['ageRange']) {
      return `La Edad final debe ser mayor a la Edad inicial.`;
    }
    return null;
  }

  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

  public maxTwoDigitsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      return value && value.toString().length > 2 ? { 'maxTwoDigits': true } : null;
    };
  }

  
  ageRangeValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const edadInicial = formGroup.get('edadInicial')?.value;
      const edadFinal = formGroup.get('edadFinal')?.value;

        return edadInicial !== null && edadFinal !== null && edadFinal < edadInicial? { 'ageRange': true }:null; 
     
    };
  }

}
