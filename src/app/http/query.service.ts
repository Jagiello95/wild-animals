import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  api = 'https://hackyeah.azurewebsites.net/WeatherForecast ';
  constructor(private http: HttpClient) {}

  public testConnection(): Observable<any> {
    return this.http.get(this.api);
  }

  public postImg(image: any): Observable<any> {
    const data = { image: image };

    const incidentApi = 'https://hackyeah.azurewebsites.net/Incident';
    return this.http.post(incidentApi, data);
  }

  public postPoint(
    x,
    y,
    spieciesCategory,
    concreteSpecies,
    type,
    incidentLevel,
    description
  ): Observable<any> {
    const incidentType = {
      incidentLevel,
      type,
    };
    const data = {
      x,
      y,
      spieciesCategory,
      concreteSpecies,
      incidentType,
      description,
    };

    const incidentApi = 'https://hackyeah.azurewebsites.net/Incident/add';
    return this.http.post(incidentApi, data);
  }
}
