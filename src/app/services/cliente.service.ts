import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiRoot = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  public findAll() : Observable<any> {
    return this.http.get(`${this.apiRoot}/clientes`);
  }

  public save(cliente: any) : Observable<any> {
    return this.http.post(`${this.apiRoot}/clientes`, cliente);
  }

  public delete(cliente: any) : Observable<any> {
    return this.http.delete(`${this.apiRoot}/clientes`, {body: cliente});
  }

  public edit(cliente: any) : Observable<any> {
    return this.http.put(`${this.apiRoot}/clientes`, cliente);
  }
}
