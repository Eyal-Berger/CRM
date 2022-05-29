import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { reject } from 'q';
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afa.auth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData),
        err => reject(err))
    })
  }

  getAuth() {
    return this.afa.authState.pipe(
      map(auth => auth)
    )
  }

  logout() {
    return this.afa.auth.signOut();
  }
  
}
