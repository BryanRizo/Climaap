import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PillComponent } from './shared/components/pill/pill.component';
import { CardsComponent } from './shared/components/cards/cards.component';
import { ClimaService } from './services/clima.service';
import { AlertsService } from './services/alerts.service';
import { LoaddingComponent } from './shared/components/loadding/loadding.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PillComponent, CardsComponent, LoaddingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Climaap';

  constructor(private climaService: ClimaService, private alertsService: AlertsService) {}

  eliminarClima(): void {
    this.alertsService.showWarningObservable('Advertencia','¿Está seguro de que desea eliminar las ciudades agregadas??').subscribe((result)=> {
      if(result) {
        this.climaService.eliminarCiudadesExtra();
      }
    })
  }
  
  public pills: {id: number, pillText: string }[] = [
    {
      id: 1,
      pillText: 'América/Managua'
    }
  ];
}
