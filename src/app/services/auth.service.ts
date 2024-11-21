import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/auth-response';
import { map, Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RegisterRequest } from '../interfaces/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userKey='user';
  private trailKey='trail';
  private trailCountMaxValue='2';

  private apiUrl:string=environment.API_URL;

  constructor(private http:HttpClient) { 

  }

  login(data:LoginRequest):Observable<AuthResponse>{
    return this.http
    .post<AuthResponse>(`${this.apiUrl}account/login`,data)
    .pipe(
      map((response)=>{
        if(response.isSuccess){
          localStorage.setItem(this.userKey,JSON.stringify(response))
        }
        return response;

      })

    );
    
  }

  register(data:RegisterRequest):Observable<AuthResponse>{
    return this.http
    .post<AuthResponse>(`${this.apiUrl}account/register`,data);
  }

  isLoggedIn = ():boolean =>{
    const token=this.getToken();
    if(!token) return false;
    return true;
  }

  getToken = (): string | null => {
    const user=localStorage.getItem(this.userKey);
    if(!user) return null;
    const userDetail:AuthResponse=JSON.parse(user);
    return userDetail.token;
  }

  HasCredit = ():boolean=>{
    //Todo: check the database, if the user has more than 1 credit, return true
    return true;
  }

  isInTrail=():boolean=>{
    const trailCount=localStorage.getItem(this.trailKey);
    if(!trailCount){
      localStorage.setItem(this.trailKey,this.trailCountMaxValue);
      return true;
    };
    return parseInt(trailCount)>0;
  }

  deTrail=():void=>{
    const trailCount=localStorage.getItem(this.trailKey);
    if(trailCount){
      const newCount=parseInt(trailCount)-1;
      localStorage.setItem(this.trailKey,newCount.toString());
    }
  }

  }
