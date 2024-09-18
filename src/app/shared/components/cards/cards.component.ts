import { Component, OnInit } from '@angular/core';
import { MundiComponent } from "../../svg/mundi/mundi.component";
import { Clima, ClimaService } from '../../../services/clima.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MundiComponent, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit{

  ciudadesClima: Clima[] = [];

  constructor(private climaService: ClimaService) { }

  ngOnInit(): void {
    this.getCiudades();
  }

  cambiarSelectedCiudad(ciudad: Clima): void {
    this.climaService.cambiarSelectedCiudad(ciudad);
  }

  getCiudades(): void {
    this.climaService.getCiudadesClima().subscribe(data => {
      this.ciudadesClima = data;
    });
  }
}
