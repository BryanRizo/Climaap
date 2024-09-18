import { Component } from '@angular/core';
import { AlertsService } from '../../../services/alerts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loadding',
  templateUrl: './loadding.component.html',
  styleUrls: ['./loading.componente.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LoaddingComponent {
  constructor(public AlertsService: AlertsService){}
}
