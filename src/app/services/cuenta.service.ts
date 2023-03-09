import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiRoot = environment.baseUrl + '/cuentas';
  
  constructor(private http: HttpClient) { }

  public findAll() : Observable<any> {
    return this.http.get(`${this.apiRoot}`);
  }

  public save(record: any) : Observable<any> {
    return this.http.post(`${this.apiRoot}`, record);
  }

  public delete(record: any) : Observable<any> {
    return this.http.delete(`${this.apiRoot}`, {body: record});
  }

  public edit(record: any) : Observable<any> {
    return this.http.put(`${this.apiRoot}`, record);
  }
}
