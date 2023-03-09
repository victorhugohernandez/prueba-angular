import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiRoot = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  public find(record: any) : Observable<any> {
    return this.http.get(`${this.apiRoot}/reportes?fechaInicio=${record.fechaInicio}&fechaFin=${record.fechaFin}&idCliente=${record.idCliente}`);
  }

  public getPdf(record: any) : Observable<any> {
    return this.http.get(`${this.apiRoot}/reportes/pdf?fechaInicio=${record.fechaInicio}&fechaFin=${record.fechaFin}&idCliente=${record.idCliente}`);
  }
}
