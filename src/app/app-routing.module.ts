import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoComponent} from "./video/video.component";
import {FaceComponent} from "./face/face.component";
import {FinishedComponent} from "./finished/finished.component";
import {SignupComponent} from "./user/signup.component";
import {SigninComponent} from "./user/signin.component";
import {AuthGuard} from "./shared/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full'
  },
  {
    path: 'video',
    component: VideoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'faceattr',
    component: FaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'finished',
    component: FinishedComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class CollectFromBrowserRoutingModule { }
