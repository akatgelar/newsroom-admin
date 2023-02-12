import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorMessageService } from '../../services/error-message.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {

  isLoading: boolean;

  constructor(
    private httpClient: HttpClient,
    private errorMessage: ErrorMessageService,
    private session: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.session.logOut();
    this.router.navigate(['login']);
  }

}
