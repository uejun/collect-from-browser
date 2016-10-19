import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );
  }

  ngOnInit() {
  }

  isAuth() {
   return this.isAuthenticated;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
