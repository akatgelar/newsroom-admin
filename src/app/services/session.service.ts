import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ErrorMessageService } from '../services/error-message.service';
import { Observable, of as observableOf } from 'rxjs';


@Injectable()
export class SessionService {


  constructor(
    private httpClient: HttpClient,
    private errorMessage: ErrorMessageService
  ) {}

  setToken(token: string) {
    localStorage.setItem('pr-newsroom-admin-token', token);
  }

  getToken() {
    return localStorage.getItem('pr-newsroom-admin-token');
  }

  setData(data: string) {
    localStorage.setItem('pr-newsroom-admin-data', data);
  }

  getData() {
    return localStorage.getItem('pr-newsroom-admin-data');
  }

  isLoggedIn(): Observable<any> {
    const tokens = this.getToken();
    const datas = JSON.parse(this.getData());
    // console.log(tokens);
    // console.log(datas);

    if (this.getToken() !== null) {
      const url = environment.apiUrl + 'profile';
      return this.httpClient
      .get(url, {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokens,
        })
      });
    } else {
      const response = {error: true, message: 'Session habis.', data: []};
      return observableOf(response);
    }
  }

  logIn = function(token, data) {
    this.setData(data);
    this.setToken(token);
    return this.getToken();
  };

  logOut = function() {
    localStorage.removeItem('pr-newsroom-admin-token');
    localStorage.removeItem('pr-newsroom-admin-data');
  };

}
