import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private as: AuthService, private router: Router, private fms: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      this.fms.show('Email and password are Required', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.as.login(value.email, value.password)
        .then(res => {
          this.fms.show('Welcome back, you are now logged in', {
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.fms.show(err.message, {
            cssClass: 'alert-danger', timeout: 4000
          });
        });
    }
  }

}
