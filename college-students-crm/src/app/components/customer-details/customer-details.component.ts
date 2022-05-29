import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/Customer';
import { CustomerService } from './../../services/customer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  id: string;
  customer: any = {
    id: '',
    firstName: '',
    lastName: '',
    IDnumber: '',
    email: '',
    phone: '',
    address: '',
    course: ''
  };

  constructor(private cs: CustomerService, private router: Router, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.ar.snapshot.params['id'];
    this.cs.getCustomer(this.id).subscribe(customer => this.customer = customer);
  }

}
