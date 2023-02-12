import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ErrorMessageService } from '../../../services/error-message.service';
import { SessionService } from '../../../services/session.service';
import { ConverterService } from '../../../services/converter.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  templateUrl: 'podcast-list.component.html',
  styleUrls: ['podcast-list.component.scss']
})
export class PodcastListComponent implements OnInit {

  public loading = false;
  private url_podcast = environment.apiUrl + 'podcast';
  environment = environment;

  page = {
    per_page: 5,
    page: 0,
    count: 0,
    orderBy: 'id',
    orderDir: 'desc',
    search: '',
    where: {},
  };

  pageLimitOptions = [
    {value: 5},
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];

  rows: Object[];

  search = '';

  constructor(
    private httpClient: HttpClient,
    private errorMessage: ErrorMessageService,
    private session: SessionService,
    public converter: ConverterService,
    private router: Router
  ) {}

  ngOnInit() {
    const sessionData = JSON.parse(this.session.getData());
    this.countTable();
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.page = pageInfo.offset;
    this.reloadTable();
  }

  limitCallback(event) {
    this.page.per_page = event.target.value;
    this.reloadTable();
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.reloadTable();
  }

  filterCallback(event) {
    const val = event.target.value.toLowerCase();
    this.page.search = val;
    this.countTable();
  }

  filterCallbacks() {
    const val = this.search;
    this.page.search = val;
    this.countTable();
  }

  countTable() {
    let params = '';
    params = params + '?where=' + JSON.stringify(this.page.where);
    params = params + '&search=' + this.page.search;
    params = params + '&count=true';
    const url = this.url_podcast + params;
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
          this.page.count = response['data']['count'];
          this.pageCallback({ offset: 0 });
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

  reloadTable() {
    let params = '';
    params = params + '?where=' + JSON.stringify(this.page.where);
    params = params + '&search=' + this.page.search;
    params = params + '&per_page=' + this.page.per_page;
    params = params + '&page=' + Number(this.page.page + 1);
    params = params + '&sort=' + this.page.orderBy + ':' + this.page.orderDir;
    const url = this.url_podcast + params;
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

  deleteData(row) {
    const params = '/' + row.id;
    const url = this.url_podcast + params;
    const jsonData = {};

    this.loading = true;
    this.httpClient
    .delete(url, {
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
          this.showSuccess(row);
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

  showDelete(event, row) {
    swal.fire({
      title: 'Konfirmasi!',
      text: 'Yakin akan menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2ecc71',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.deleteData(row);
      }
    });
  }

  showSuccess(row) {
    swal.fire({
      title: 'Informasi!',
      text: 'Data berhasil dihapus.',
      icon: 'success',
      allowOutsideClick: false,
    }).then(() => {
      this.countTable();
    });
  }

}
