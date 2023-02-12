import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularEditorModule } from '@kolkov/angular-editor';

// Child Component
import { PasswordComponent } from './password.component';

// Buttons Routing
import { PasswordRoutingModule } from './password-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    PasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxLoadingModule,
    AngularEditorModule
  ],
  declarations: [
    PasswordComponent
  ]
})
export class PasswordModule { }
