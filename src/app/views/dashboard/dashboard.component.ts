import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SessionService } from '../../services/session.service';
import { ConverterService } from '../../services/converter.service';
import { ErrorMessageService } from '../../services/error-message.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public loading = false;
  isLoading: boolean;

  sessionData = {};

  total_artikel = 0;
  total_video = 0;
  total_podcast = 0;
  total_koran = 0;
  total_user = 0;
  total_akses = 0;


  constructor(
    private httpClient: HttpClient,
    private session: SessionService,
    private errorMessage: ErrorMessageService,
    public converter: ConverterService,
  ) {}

  ngOnInit(): void {
    this.sessionData = JSON.parse(this.session.getData());
    this.getAllData();
  }

  getAllData() {
    this.getDataAPI(environment.apiUrl + 'artikel');
    this.getDataAPI(environment.apiUrl + 'video');
    this.getDataAPI(environment.apiUrl + 'podcast');
    this.getDataAPI(environment.apiUrl + 'koran');
    this.getDataAPI(environment.apiUrl + 'user');
  }

  getDataAPI(new_url) {

    this.isLoading = true;
    const url = new_url + '?count=true';
    const option = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.session.getToken().toString()
      })
    };

    this.httpClient
    .get(url, option)
    .subscribe(
      response => {
        this.isLoading = false;
        if (new_url.includes('artikel')) {
          this.total_artikel = response['data']['count'];
        } else if (new_url.includes('video')) {
          this.total_video = response['data']['count'];
        } else if (new_url.includes('podcast')) {
          this.total_podcast = response['data']['count'];
        } else if (new_url.includes('koran')) {
          this.total_koran = response['data']['count'];
        } else if (new_url.includes('user')) {
          this.total_user = response['data']['count'];
        }
      },
      error => {
        try {
          this.errorMessage.openErrorSwal(error['error']['message']);
        } catch (e) {
          this.errorMessage.openErrorSwal(error['message']);
        }
        this.isLoading = false;
      }
    );
  }


}
