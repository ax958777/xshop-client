import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModelingService {

  apiUrl = environment.API_URL;

  constructor(private _http: HttpClient) {}

  addModeling(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}Modelings`, data);
  }

  updateModeling(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/Modelings/${id}`, data);
  }

  getModelingList(): Observable<any> {
    return this._http.get(`${this.apiUrl}Modelings`);
  }

  deleteModeling(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/Modelings/${id}`);
  }
}
