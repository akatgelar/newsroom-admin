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
import { VideoListComponent } from './video-list/video-list.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { VideoEditComponent } from './video-edit/video-edit.component';

// Buttons Routing
import { VideoRoutingModule } from './video-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
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
    VideoListComponent,
    VideoDetailComponent,
    VideoAddComponent,
    VideoEditComponent
  ]
})
export class VideoModule { }
