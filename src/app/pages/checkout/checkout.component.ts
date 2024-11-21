import { Component, inject, OnInit } from '@angular/core';
import { Payment } from '../../interfaces/payment';
import { environment } from '../../../environments/environment.development';
import { PaymentService } from '../../services/payment.service';
import { CreatePaymentIntentRequestItem } from '../../interfaces/create-payment-intent-request-item';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  ngOnInit(): void {
    this.invokeStripe();
    this.initialize();
  }
  stripe:any;
  payment={} as Payment;
  paymentService=inject(PaymentService);
  clientSecret='';
  elements:any;
  matSnackBar=inject(MatSnackBar);

  invokeStripe(){
    if(!window.document.getElementById('stripe-script')){
      const script=window.document.createElement('script');
      script.id='stripe-script';
      script.type='text/javascript';
      script.src='https://js.stripe.com/v3/';
      script.onload=()=>{
        this.stripe=(<any>window).Stripe(environment.STRIPE_KEY);
      };
      window.document.body.appendChild(script);
      this.payment.openStripe=true;
    }



  }

  async initialize(){

    const amount=Number(localStorage.getItem('checkoutAmount'));
    const items:[CreatePaymentIntentRequestItem]=[{id:'product-id',amount:amount*100}];

    const response=this.paymentService.createpaymentIntent({"items":items});

    response.subscribe(
      (data:any)=>{
        this.clientSecret=data.clientSecret;
        const appearance = {
          theme: 'stripe',
        };
        this.elements=this.stripe.elements({appearance,clientSecret:this.clientSecret});

        const paymentElementOptions = {
          layout: "accordion",
        };
      
        const paymentElement = this.elements.create("payment", paymentElementOptions);
        paymentElement.mount("#payment-element");

      }
    );


  }

  async makePayment(e:Event){
    e.preventDefault();
    let elements=this.elements;
    const response= await this.stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: environment.SITE_URL+'credit-shop',
      },
    });

    this.matSnackBar.open(response.error.message,'Close',{
      duration:5000,
      horizontalPosition:'center'
    }
    );


  }





}
