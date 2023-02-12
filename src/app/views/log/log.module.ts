import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { LogComponent } from './log.component';
import { LogRoutingModule } from './log-routing.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LogRoutingModule,
    ChartsModule,
    BsDropdownModule,
    NgxLoadingModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ LogComponent ]
})
export class LogModule { }
