import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Stimulus} from "../stimulus/stimulus";
import {User} from "../user/user";

@Injectable()
export class FaceUploadService {

  private endpoint = 'https://nipfrjhmk7.execute-api.ap-northeast-1.amazonaws.com/prd_sympathy01_collect_faces/faces';
  private user: User;
  private stimulus: Stimulus;
  private gender: string;
  private glasses: string;
  private eyebrows: string;

  constructor(private http: Http) { }

  setFaceAttributes(gender: string, glasses: string, eyebrows: string) {
    this.gender = gender;
    this.glasses = glasses;
    this.eyebrows = eyebrows;
  }

  setUser(user: User) {
    this.user = user;
  }

  setStimulus(stimulus: Stimulus) {
    this.stimulus = stimulus;
  }

  isReady() {
    return this.gender !== null && this.user !== null;
  }

  uploadFace(data: string) {
    var json =  JSON.stringify(
      {
        user_id: this.user.user_id,
        stimulus_id: this.stimulus.stimulus_id,
        emotion: this.stimulus.emotion,
        image_ext: 'png',
        data: data,
        gender: this.gender,
        glasses: this.glasses,
        eyebrows: this.eyebrows
      }
    );

    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function()
    {
      var READYSTATE_COMPLETED = 4;
      var HTTP_STATUS_OK = 200;

      if( this.readyState == READYSTATE_COMPLETED
        && this.status == HTTP_STATUS_OK )
      {
        // レスポンスの表示
        return true;
      }
    }
    xmlHttpRequest.open( 'POST', this.endpoint );
    xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/json' );
    xmlHttpRequest.send( json );
  }

}
