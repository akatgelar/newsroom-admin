import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';


// Child Component
import { ArtikelListComponent } from './artikel-list/artikel-list.component';
import { ArtikelDetailComponent } from './artikel-detail/artikel-detail.component';
import { ArtikelAddComponent } from './artikel-add/artikel-add.component';
import { ArtikelEditComponent } from './artikel-edit/artikel-edit.component';

// Buttons Routing
import { ArtikelRoutingModule } from './artikel-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ArtikelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxLoadingModule.forRoot({}),
    AngularEditorModule,
    NgxSummernoteModule,
    NgSelectModule,
    NgOptionHighlightModule
  ],
  declarations: [
    ArtikelListComponent,
    ArtikelDetailComponent,
    ArtikelAddComponent,
    ArtikelEditComponent
  ]
})
export class ArtikelModule { }
