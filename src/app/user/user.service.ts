import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./user";
import {Headers, Response, Http} from "@angular/http";

@Injectable()
export class UserService {

  private USERS_ENDPOINT_URL =  "https://nipfrjhmk7.execute-api.ap-northeast-1.amazonaws.com/prd_sympathy01_collect_faces/users";

  private user: User;

  constructor(private http: Http) { }

  register(uid: string, email: string, name: string): Promise<User> {
    return this.http.post(this.USERS_ENDPOINT_URL,
      JSON.stringify({uid: uid, email: email, name: name}),
        {headers: new Headers({'Content-Type': 'application/json'})})
        .map((r: Response) => {
          return {user_id: r.json()['user_id'], uid: r.json()['uid'], email: r.json()['email'], name: r.json()['name']};
        })
      .toPromise()
  }

  retrieveUser(uid: string): Promise<User> {
   return this.http.get(this.USERS_ENDPOINT_URL+"/"+uid)
     .map((r:Response)=>{
       return {user_id: r.json()['user_id'], uid: r.json()['uid'], email: r.json()['email'], name: r.json()['name'], count: r.json()['count']};
     })
     .toPromise()
  }

}
