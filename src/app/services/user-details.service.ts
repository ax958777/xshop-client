import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserDetailResponse } from '../interfaces/user-detail-response';
import { UpdateUserRequest } from '../interfaces/update-user-request';
import { UpdateUserResponse } from '../interfaces/update-user-response';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private apiUrl:string=environment.API_URL;

  constructor(private http:HttpClient) { }

  getUserDetails=():Observable<UserDetailResponse>=>{
    return this.http.get<UserDetailResponse>(`${this.apiUrl}account/get-user-details`)
  }

  updateUser=(user:UpdateUserRequest):Observable<UpdateUserResponse>=>{
    return this.http.patch<UpdateUserResponse>(`${this.apiUrl}account/user`,user)

  }
}
