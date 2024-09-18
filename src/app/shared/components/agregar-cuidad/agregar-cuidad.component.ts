import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertsService } from '../../../services/alerts.service';
import { ValidateFormService } from '../../../services/validate-form.service';
import { ClimaService } from '../../../services/clima.service';
import { LatitudeLongitudeMaskDirective } from '../directive/LatitudeLongitudeMask.directive';

@Component({
  selector: 'app-agregar-cuidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LatitudeLongitudeMaskDirective],
  templateUrl: './agregar-cuidad.component.html',
})
export class AgregarCuidadComponent {

  continents: string[] = ['África', 'América', 'Asia', 'Europa', 'Oceanía'];

  modalRef?: BsModalRef;
  ciudadForm: FormGroup;
  submitForm: boolean = false;

  constructor(private modalService: BsModalService, private alertServices: AlertsService, private validatorsService: ValidateFormService, private fb: FormBuilder, private climaService: ClimaService) {
    this.ciudadForm = this.fb.group({
      ciudad: ['', [Validators.required, Validators.minLength(3)]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      continente: ['África', Validators.required]
    });
  }

  openModal(template: TemplateRef<void>) {
    console.log('test');
    this.modalRef = this.modalService.show(template, {
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  onSubmit() {
    this.submitForm = true;
    if (this.ciudadForm!.valid) {
      console.log('Formulario válido:', this.ciudadForm!.value);
      this.submitForm = false;
      this.climaService.agregarCiudad(this.ciudadForm.value);
      this.alertServices.showSuccessfulWithObservable("Exitoso", "Se ha guardado la ubicación.").subscribe(result => this.modalRef?.hide());
      this.ciudadForm.reset();
    } else {
      console.log('Formulario inválido');
      this.alertServices.showError("Error", "Por favor, verifica el formulario y asegúrate de que todos los campos estén correctamente completados.io.");
      this.ciudadForm!.markAllAsTouched();
    }
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.ciudadForm, field, this.submitForm);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.ciudadForm, field);
  }
}
