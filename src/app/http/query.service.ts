import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../enum/endpoint';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  api = 'https://hackyeah.azurewebsites.net/WeatherForecast ';
  constructor(private http: HttpClient) {}

  public testConnection(): Observable<any> {
    return this.http.get(Endpoint.Test);
  }
}
