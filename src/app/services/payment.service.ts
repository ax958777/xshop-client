import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePaymentIntentResponse } from '../interfaces/create-payment-intent-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl=environment.API_URL;


  constructor(private http:HttpClient) { }

  createpaymentIntent=(items:any):Observable<CreatePaymentIntentResponse>=>
    this.http.post<CreatePaymentIntentResponse>(`${this.apiUrl}payments/create-payment-intent`,items)
}
