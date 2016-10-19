import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {UserService} from "./user/user.service";
import {MaterialModule} from "@angular/material";
import {CollectFromBrowserRoutingModule} from "./app-routing.module";
import { VideoComponent } from './video/video.component';
import { StimulusComponent } from './stimulus/stimulus.component';
import {StimulusService} from "./stimulus/stimulus.service";
import {FaceUploadService} from "./face/face-upload.service";
import { FaceComponent } from './face/face.component';
import { FinishedComponent } from './finished/finished.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './user/signup.component';
import { SigninComponent } from './user/signin.component';
import {AuthGuard} from "./shared/auth.guard";
import {AuthService} from "./shared/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    StimulusComponent,
    FaceComponent,
    FinishedComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    CollectFromBrowserRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    StimulusService,
    FaceUploadService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
