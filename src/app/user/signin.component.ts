import { Component, OnInit } from '@angular/core';
import {User} from "./user";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {FaceUploadService} from "../face/face-upload.service";
import {UserService} from "./user.service";
import {AuthService, firebase} from "../shared/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  sineupForm: FormGroup;
  signining = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private faceUploadService: FaceUploadService,
              private authService: AuthService,
              private router: Router) {

    this.sineupForm = formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'password': ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(6)
      ]]
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    this.signining = true;
    var email = this.sineupForm.value['email'];
    var password = this.sineupForm.value['password'];

    this.authService.signIn(email, password)
      .then(
        user => {
          this.userService.retrieveUser(user.uid)
            .then(
              dbUser => {
                this.faceUploadService.setUser(dbUser);
                this.signining = false;
                this.router.navigate(['/faceattr']);
            })
        }
      )
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.signining = false;
      });

  }

}
