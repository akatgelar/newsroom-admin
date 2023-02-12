import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularEditorModule } from '@kolkov/angular-editor';

// Child Component
import { ProfileComponent } from './profile.component';

// Buttons Routing
import { ProfileRoutingModule } from './profile-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxLoadingModule,
    AngularEditorModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
