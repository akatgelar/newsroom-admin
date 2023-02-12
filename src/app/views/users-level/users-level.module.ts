import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxSummernoteModule } from 'ngx-summernote';


// Child Component
import { UsersLevelListComponent } from './users-level-list/users-level-list.component';
import { UsersLevelDetailComponent } from './users-level-detail/users-level-detail.component';
import { UsersLevelAddComponent } from './users-level-add/users-level-add.component';
import { UsersLevelEditComponent } from './users-level-edit/users-level-edit.component';

// Buttons Routing
import { UsersLevelRoutingModule } from './users-level-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    UsersLevelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxLoadingModule.forRoot({}),
    AngularEditorModule,
    NgxSummernoteModule
  ],
  declarations: [
    UsersLevelListComponent,
    UsersLevelDetailComponent,
    UsersLevelAddComponent,
    UsersLevelEditComponent
  ]
})
export class UsersLevelModule { }
