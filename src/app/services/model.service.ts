import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelingRequest } from '../interfaces/modeling-request';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  apiUrl=environment.API_URL;

  constructor(private _http:HttpClient) { }

  getModels():Observable<any>{
    return this._http.get(`${this.apiUrl}modeling`)
  }

  deleteModeling(id:String):Observable<any>{
    return this._http.delete(`${this.apiUrl}modeling/${id}`)
  }

  addModeling(data:ModelingRequest):Observable<any> {
    return this._http.post(`${this.apiUrl}modeling`,data)
  }

  updateModeling(id:string,data:ModelingRequest):Observable<any> {
    return this._http.put(`${this.apiUrl}modeling/${id}`,data)
  }
}
