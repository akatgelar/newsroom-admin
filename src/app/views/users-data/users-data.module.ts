import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxSummernoteModule } from 'ngx-summernote';


// Child Component
import { UsersDataListComponent } from './users-data-list/users-data-list.component';
import { UsersDataDetailComponent } from './users-data-detail/users-data-detail.component';
import { UsersDataAddComponent } from './users-data-add/users-data-add.component';
import { UsersDataEditComponent } from './users-data-edit/users-data-edit.component';

// Buttons Routing
import { UsersDataRoutingModule } from './users-data-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    UsersDataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxLoadingModule.forRoot({}),
    AngularEditorModule,
    NgxSummernoteModule
  ],
  declarations: [
    UsersDataListComponent,
    UsersDataDetailComponent,
    UsersDataAddComponent,
    UsersDataEditComponent
  ]
})
export class UsersDataModule { }
