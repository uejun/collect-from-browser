import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Subject, Observable} from "rxjs";

export declare var firebase: any;

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  signUp(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);

  }

  signIn(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    });
    return subject.asObservable();
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }

  getCurrentUser(): Observable<any> {
    const subject = new Subject<any>();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        subject.next(user);
       return user;
      } else {
        subject.next(null);
      }
    });
    return subject.asObservable();
  }

}
