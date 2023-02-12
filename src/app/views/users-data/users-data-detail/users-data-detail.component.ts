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
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  templateUrl: 'users-data-detail.component.html',
  styleUrls: ['users-data-detail.component.scss']
})
export class UsersDataDetailComponent implements OnInit {

  public loading = false;
  public url_api = environment.apiUrl.slice(0, -1);
  private url_user_data = environment.apiUrl + 'user';

  rows: {};
  id = '0';

  iframeSource: HTMLImageElement;
  iframeSrc;

  constructor(
    private httpClient: HttpClient,
    private errorMessage: ErrorMessageService,
    private session: SessionService,
    public converter: ConverterService,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    const params = '/' + this.id;
    const url = this.url_user_data + params;
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
          if (response['data']['iframe']) {
            const div = document.createElement('div');
            div.innerHTML = response['data']['iframe'];
            this.iframeSource = (div.firstChild as HTMLImageElement);
            this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSource.src);
          }
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
