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
import { KoranListComponent } from './koran-list/koran-list.component';
import { KoranDetailComponent } from './koran-detail/koran-detail.component';
import { KoranAddComponent } from './koran-add/koran-add.component';
import { KoranEditComponent } from './koran-edit/koran-edit.component';

// Buttons Routing
import { KoranRoutingModule } from './koran-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    KoranRoutingModule,
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
    KoranListComponent,
    KoranDetailComponent,
    KoranAddComponent,
    KoranEditComponent
  ]
})
export class KoranModule { }
