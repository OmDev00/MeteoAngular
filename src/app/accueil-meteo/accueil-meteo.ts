import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meteoserv } from '../services/meteoserv';

@Component({
  selector: 'app-accueil-meteo',
  imports: [],
  templateUrl: './accueil-meteo.html',
  styleUrl: './accueil-meteo.css'
})
export class AccueilMeteo {
  @Input() weather!: any;

}

