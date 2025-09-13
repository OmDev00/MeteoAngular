import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MeteoService, ForecastDay } from './services/meteo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'], // adapte si besoin
  imports: [FormsModule, CommonModule, DatePipe, DecimalPipe],
})
export class App implements OnInit {
  city = 'Paris';

  weather: any = null;           // météo actuelle
  forecast: ForecastDay[] = [];  // prévision 5 jours

  loading = false;
  error: string | null = null;

  constructor(private meteo: MeteoService) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.loading = true;
    this.error = null;
    const q = this.city.trim();

    forkJoin({
      current: this.meteo.getCurrentByCity(q),
      days: this.meteo.get5DayByCity(q),
    }).subscribe({
      next: ({ current, days }) => {
        this.weather = current;
        this.forecast = days;
        this.loading = false;
        if (!days.length) this.error = 'Aucune prévision disponible.';
      },
      error: () => {
        this.error = 'Erreur réseau';
        this.loading = false;
      },
    });
  }
}
