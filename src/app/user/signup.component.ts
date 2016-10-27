import { Component, OnInit } from '@angular/core';
import {User} from "./user";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {FaceUploadService} from "../face/face-upload.service";
import {UserService} from "./user.service";
import {firebase, AuthService} from "../shared/auth.service";
import {setInterval} from "timers";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  sineupForm: FormGroup;
  errorMessage = "";
  error = false;
  registering = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private faceUploadService: FaceUploadService,
              private authService: AuthService,
              private router: Router) {

    this.sineupForm = formBuilder.group({
      'user_name': ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      'email': ['', [
        Validators.required,
        Validators.maxLength(50),
        this.isEmail
      ]],
      'password': ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(6)
      ]],
      'confirm_password': ['', [
        Validators.required,
        this.isEqualPassword.bind(this)
      ]]
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    this.registering = true;
    var username = this.sineupForm.value['user_name'];
    var email = this.sineupForm.value['email'];
    var password = this.sineupForm.value['password'];

    this.authService.signUp(email, password)
      .then(
        user => {
          this.userService.register(user.uid, user.email, username)
              .then( u => {
                  this.faceUploadService.setUser(u);
                  this.registering = false;
                  this.router.navigate(['/faceattr']);
              },
                error =>  {
                  this.errorMessage = <any>error;
                  console.log(this.errorMessage);
                }
              );
        }
      )
      .catch(function(error) {
        console.log("firebaseでエラーが出たよ");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.registering = false;
      });

  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return {noEmail: true};
    }
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.sineupForm) {
      return {passwordsNotMatch: true};
    }
    if (control.value !== this.sineupForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

}
