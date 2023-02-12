import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorMessageService } from '../../services/error-message.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  isLoading: boolean;
  passwordType = 'password';

  constructor(
    private httpClient: HttpClient,
    private errorMessage: ErrorMessageService,
    private session: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.isLoading = true;
    const url = environment.apiUrl + 'login';
    const formValue = this.myForm.value;
    const jsonValue = JSON.stringify(formValue);
    const option = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    this.httpClient
    .post(url, jsonValue, option)
    .subscribe(
      response => {
        this.isLoading = false;
        if (response['success'] === true) {
          if (response['data']['user_level_id'] === 2) {
            this.session.logIn(response['data']['api_token'], JSON.stringify(response['data']));
            this.router.navigate(['dashboard']);
          } else {
            this.errorMessage.openErrorSwal('Hanya role admin yg bisa akses!');
          }
        } else {
          this.errorMessage.openErrorSwal(response['message']);
        }
      },
      error => {
        this.errorMessage.openErrorSwal(error['error']['message']);
        this.isLoading = false;
      }
    );

  }


  toggleTextPassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }
}
