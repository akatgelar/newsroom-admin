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
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { PodcastAddComponent } from './podcast-add/podcast-add.component';
import { PodcastEditComponent } from './podcast-edit/podcast-edit.component';

// Buttons Routing
import { PodcastRoutingModule } from './podcast-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    PodcastRoutingModule,
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
    PodcastListComponent,
    PodcastDetailComponent,
    PodcastAddComponent,
    PodcastEditComponent
  ]
})
export class PodcastModule { }
