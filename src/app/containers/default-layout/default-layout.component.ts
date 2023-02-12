import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { SessionService } from '../../services/session.service';
import { ConverterService } from '../../services/converter.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  environment = environment;

  rows = {
    user_level_id: 0,
    nama: '',
    email: '',
  };
  rowsNotification = [];

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private httpClient: HttpClient,
    private session: SessionService,
    private converter: ConverterService,
  ) {
    this.rows = JSON.parse(session.getData());
    // this.getNotification();
  }


}
