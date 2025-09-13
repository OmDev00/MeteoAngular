import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, of, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ForecastDay {
  date: Date;
  tmin: number;
  tmax: number;
  precip: number;
  code: number;
}

@Injectable({ providedIn: 'root' })
export class MeteoService {
  constructor(private http: HttpClient) {}

  // Météo actuelle 
  getCurrentByCity(city: string): Observable<any> {
    const apiKey = environment.openWeatherApiKey;
    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${apiKey}`;
    return this.http.get<any>(url);
  }

  // Géocodage 
  private geocode(city: string): Observable<{ lat: number; lon: number } | null> {
    const u =
      'https://geocoding-api.open-meteo.com/v1/search?count=1&language=fr&format=json&name=' +
      encodeURIComponent(city);
    return this.http.get<any>(u).pipe(
      map((r) => {
        const p = r?.results?.[0];
        return p ? { lat: p.latitude, lon: p.longitude } : null;
      }),
      catchError(() => of(null))
    );
  }

  // Prévision quotidienne 5 jours
  get5DayByCity(city: string): Observable<ForecastDay[]> {
    return this.geocode(city).pipe(
      switchMap((geo) => {
        if (!geo) return of<ForecastDay[]>([]);
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}` +
          `&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,weathercode` +
          `&forecast_days=5&timezone=auto`;
        return this.http.get<any>(url).pipe(
          map((d) => {
            const t = d?.daily;
            if (!t?.time?.length) return [];
            return (t.time as string[]).map((day: string, i: number) => ({
              date: new Date(day + 'T00:00:00'),
              tmin: t.temperature_2m_min[i],
              tmax: t.temperature_2m_max[i],
              precip: t.precipitation_sum[i],
              code: t.weathercode[i],
            }));
          }),
          catchError(() => of<ForecastDay[]>([]))
        );
      })
    );
  }
}
