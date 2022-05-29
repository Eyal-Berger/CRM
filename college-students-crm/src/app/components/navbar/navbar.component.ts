import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  userEmail: string;
  

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit() {
    this.as.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.userEmail = auth.email;
      }
    });
  }

  onLoggedOutBtn(event) {
    event.preventDefault();
    this.isLoggedIn = false;
    this.as.logout();
    this.router.navigate(['/login']);
  }

}
