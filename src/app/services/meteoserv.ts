import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Meteoserv {
  apiKey = "aa3896d682001e8838ea641eccb8d758";
  apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`);
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`);
  }
}
