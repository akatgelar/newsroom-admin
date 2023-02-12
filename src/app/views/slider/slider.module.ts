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
import { SliderListComponent } from './slider-list/slider-list.component';
import { SliderDetailComponent } from './slider-detail/slider-detail.component';
import { SliderAddComponent } from './slider-add/slider-add.component';
import { SliderEditComponent } from './slider-edit/slider-edit.component';

// Buttons Routing
import { SliderRoutingModule } from './slider-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    SliderRoutingModule,
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
    SliderListComponent,
    SliderDetailComponent,
    SliderAddComponent,
    SliderEditComponent
  ]
})
export class SliderModule { }
