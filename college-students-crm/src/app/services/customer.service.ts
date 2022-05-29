import { EditCustomerComponent } from './../../../../stage-crm/src/app/components/edit-customer/edit-customer.component';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../model/Customer';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  customerCollection: AngularFirestoreCollection<Customer>;
  customerDoc: AngularFirestoreDocument<Customer>;
  customers: Observable<Customer[]>;
  customer: Observable<Customer>;

  ref: any;
  task: any;
  downloadURL: string;
  randomId: string = '';


  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private afStorage: AngularFireStorage) {
    this.customerCollection = this.afs.collection('customers', ref => ref.orderBy('lastName', 'asc'));
  }



  getCustomers(): Observable<Customer[]> {
    this.customers = this.customerCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Customer;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.customers;
  }

  getCustomersByIDnumber(query: string): Observable<Array<Customer>> {
    console.log(query);
    this.customers = this.afs.collection('customers', ref => ref.orderBy('IDnumber').startAt(query).endAt(`${query}\uf8ff`)
      .limit(10))
      .snapshotChanges()
      .pipe(
      map(actions => {
        console.log(actions);
        return actions.map(a => {
          const data = a.payload.doc.data() as Customer;
          data.id = a.payload.doc.id;
          return data;
        });
      })
      )
    return this.customers;
  }

  uploadFile(file: File) {
    this.randomId = Math.random().toString(36).substring(2);
    return this.afStorage.upload(this.randomId, file);
  }


  addCustomer(customer: Customer, file: File): Promise<any> {
   return this.uploadFile(file)
      .then(x => {
        const ref = this.afStorage.ref(this.randomId);
        return ref.getDownloadURL()
          .subscribe(url => {
            customer.img = url;
            return this.customerCollection.add(customer);
          })
      })

  }

  getCustomer(id: string): Observable<Customer> {
    this.customerDoc = this.afs.doc<Customer>(`customers/${id}`);
    this.customer = this.customerDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Customer;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.customer;
  }

  deleteCustomer(customer: Customer) {
    this.customerDoc = this.afs.doc(`customers/${customer.id}`);
    this.afStorage.storage.refFromURL(customer.img).delete()
    .then(result => console.log('file deleted'));
    this.customerDoc.delete();
  }

  updateCustomer(customer: Customer) {
    this.customerDoc = this.afs.doc(`customers/${customer.id}`);
    this.customerDoc.update(customer);
  }
  
}
