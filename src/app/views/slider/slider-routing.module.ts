import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SliderListComponent } from './slider-list/slider-list.component';
import { SliderDetailComponent } from './slider-detail/slider-detail.component';
import { SliderAddComponent } from './slider-add/slider-add.component';
import { SliderEditComponent } from './slider-edit/slider-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Slider'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: SliderListComponent,
        data: {
          title: 'Data'
        }
      },
      {
        path: 'detail/:id',
        component: SliderDetailComponent,
        data: {
          title: 'Rincian'
        }
      },
      {
        path: 'add',
        component: SliderAddComponent,
        data: {
          title: 'Tambah'
        }
      },
      {
        path: 'edit/:id',
        component: SliderEditComponent,
        data: {
          title: 'Ubah'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderRoutingModule {}
