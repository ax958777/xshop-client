import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-shop',
  standalone: true,
  imports: [],
  templateUrl: './credit-shop.component.html',
  styleUrl: './credit-shop.component.css'
})
export class CreditShopComponent {
  router=inject(Router);

pay(amount:any){
  localStorage.setItem('checkoutAmount',amount);
  this.router.navigate(['/checkout']);
}
}
