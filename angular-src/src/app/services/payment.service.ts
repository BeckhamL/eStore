import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  stripe = Stripe('pk_test_b424iv0df4RYRUZcHIqr2mO6003rxHyuCE');
  
  constructor() { }
}
