import { Component, signal } from '@angular/core';
import { AccueilMeteo } from './accueil-meteo/accueil-meteo';
import { SearchBar } from "./search-bar/search-bar";
import { Meteoserv } from './services/meteoserv';

@Component({
  selector: 'app-root',
  imports: [AccueilMeteo, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  weather = signal<any | null>(null);
  loading = signal(false);
  error = signal('');

  constructor(private weatherService: Meteoserv) {}

  searchCity(city: string) {
    this.loading.set(true);
    this.error.set('');
    this.weatherService.getWeather(city).subscribe({
      next: data => {
        this.weather.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Ville non trouvée..');
        this.loading.set(false);
      }
    });
  }
}
