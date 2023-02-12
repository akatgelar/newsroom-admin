import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ErrorMessageService } from '../../../services/error-message.service';
import { SessionService } from '../../../services/session.service';
import { ConverterService } from '../../../services/converter.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  templateUrl: 'users-level-detail.component.html',
  styleUrls: ['users-level-detail.component.scss']
})
export class UsersLevelDetailComponent implements OnInit {

  public loading = false;
  private url_user_level = environment.apiUrl + 'user_level';

  rows: {};
  id = '0';

  constructor(
    private httpClient: HttpClient,
    private errorMessage: ErrorMessageService,
    private session: SessionService,
    public converter: ConverterService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    const params = '/' + this.id;
    const url = this.url_user_level + params;
    const jsonData = {};

    this.loading = true;
    this.httpClient
    .get(url, {
      reportProgress: true,
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.session.getToken().toString()
      })
    })
    .subscribe(
      response => {
        this.loading = false;
        if (response['success'] === true) {
          this.rows = response['data'];
        } else {
          this.errorMessage.openErrorSwal(response['message']);
        }
      },
      error => {
        this.loading = false;
        try {
          this.errorMessage.openErrorSwal(error['error']['message']);
        } catch (e) {
          this.errorMessage.openErrorSwal(error['message']);
        }
      }
    );
  }
}
