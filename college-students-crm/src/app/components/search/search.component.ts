import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CustomerService } from '../../services/customer.service';
import { Customer } from './../../model/Customer';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest } from "rxjs";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {

  myControl = new FormControl();

  customers: Customer[];

  constructor(private cs: CustomerService, private afs: AngularFirestore) { }

  filteredOptions: Observable<Customer[]>;

  ngOnInit() {

    this.myControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(value => {
        console.log(value);
        let val = value as string;
        this.cs.getCustomersByIDnumber(val.toLowerCase())
          .subscribe(customers => this.customers = customers);
      });
  }

}
