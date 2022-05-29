import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Customer } from '../../model/Customer';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {


  firstName: string;
  lastName: string;
  IDnumber: string;
  img: string;
  email: string;
  phone: string;
  address: string;
  course: string;
  file: File;



  @ViewChild('search') public searchElement: ElementRef;

  constructor(
    private fms: FlashMessagesService,
    private cs: CustomerService,
    private router: Router,
    private MapsAPILoader: MapsAPILoader,
    private NgZone: NgZone
  ) { }

  ngOnInit() {
    this.MapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });

        autocomplete.addListener("place_changed", () => {
          this.NgZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }

  onFileUpload(evt) {
    this.file = evt.target.files[0];
  }


  onSubmit({ value, valid }: { value: Customer, valid: boolean }) {
    console.log('value', value);
    if (!valid) {

      this.fms.show('Please fill all reuqired field', {
        cssClass: 'alert-danger', timeout: 4000
      });

    } else {
      this.cs.addCustomer(value, this.file)
        .then(success => {
          this.fms.show('Customer saved', {
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/customers']);
        })
    }
  }

}
