import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireModule} from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CustomersComponent,
    CustomerDetailsComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    SettingsComponent,
    PageNotFoundComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrHRU-n0Gd7hVx_1tgS4zwy_XKfyIAoFE',
      libraries: ['places']
    }) 
  ],
  providers: [AuthGuard, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
