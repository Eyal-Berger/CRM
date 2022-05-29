import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/Customer';
import { CustomerService } from '../../services/customer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})

export class EditCustomerComponent implements OnInit {
  id: string;
  customer: any = {
    firstName: '',
    lastName: '',
    IDnumber: '',
    email: '',
    phone: '',
    address: '',
    course: ''
  };

  constructor(private cs: CustomerService, private fms: FlashMessagesService, private router: Router, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.ar.snapshot.params['id'];
    this.cs.getCustomer(this.id).subscribe(customer => this.customer = customer);
  }

  onSubmit({ value, valid }: { value: Customer, valid: boolean }) {

    if (!valid) {

      this.fms.show('There is en error saving fields', {
        cssClass: 'alert-danger', timeout: 4000

      });
    } else {

      value.id = this.id;
      this.cs.updateCustomer(value);
      this.fms.show('Student Data Update', {
        cssClass: 'alert-success', timeout: 4000

      });
      this.router.navigate(['/customers']);
    }
  }

}
