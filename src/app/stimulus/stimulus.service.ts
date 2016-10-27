import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class StimulusService implements OnInit {

  private  endpoint = 'https://nipfrjhmk7.execute-api.ap-northeast-1.amazonaws.com/prd_sympathy01_collect_faces/stimuli'

  constructor(private http: Http) {
  }

  ngOnInit(): void {
  }

  retrieveStimuli(user_id: number): Observable<any> {
    return this.http.get(this.endpoint + "/" + user_id)
      .map((r:Response) => r.json())
  }


}
