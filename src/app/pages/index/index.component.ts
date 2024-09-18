import { Component, OnInit } from "@angular/core";
import { AgregarCuidadComponent } from "../../shared/components/agregar-cuidad/agregar-cuidad.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClimaService, Clima } from "../../services/clima.service";
import { CommonModule } from "@angular/common";
import { AlertsService } from "../../services/alerts.service";

@Component({
    selector: '',
    standalone: true,
    templateUrl: './index.component.html',
    styles: `
        .example{
            padding: 1rem 0;
            max-width: 100%;
            word-break: break-all;
        }
    `,
    imports: [ReactiveFormsModule, AgregarCuidadComponent, CommonModule, FormsModule]
})
export class IndexComponent implements OnInit {

    ciudadSelected: Clima | null = null;
    opcionesDias: number[] = [2, 5, 7];
    datosClimaticos: string = '';
    selectedDays: number = 2;

    constructor(private climaService: ClimaService, private alertsServices: AlertsService) { }

    ngOnInit(): void {
        this.getSelectedClima();
    }

    getSelectedClima(): void {
        this.climaService.getSelectedCiudad().subscribe(data => {
            this.ciudadSelected = data;
            this.getPronosticoClima();
        });
    }

    eliminarClima(): void {
        this.climaService.eliminarCiudadesExtra();
    }

    getPronosticoClima(): void {
        this.alertsServices.showLoading();
        this.climaService.getPronostico(Number(this.selectedDays)).subscribe(
            data => {
                this.datosClimaticos = data;
                this.alertsServices.hideLoading();
            },
            error => {
                this.alertsServices.hideLoading();
                this.alertsServices.showError('Error', 'No se ha podido cargar los datos.')
            }
        );
    }


    onDaysChange(): void {
        this.getPronosticoClima();
    }
}