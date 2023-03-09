import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiRoot = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  public findAll() : Observable<any> {
    return this.http.get(`${this.apiRoot}/movimientos`);
  }

  public save(record: any) : Observable<any> {
    return this.http.post(`${this.apiRoot}/movimientos`, record);
  }

  public delete(record: any) : Observable<any> {
    return this.http.delete(`${this.apiRoot}/movimientos`, {body: record});
  }

  public edit(record: any) : Observable<any> {
    return this.http.put(`${this.apiRoot}/movimientos`, record);
  }
}
