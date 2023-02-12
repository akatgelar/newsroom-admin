import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { PodcastAddComponent } from './podcast-add/podcast-add.component';
import { PodcastEditComponent } from './podcast-edit/podcast-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Podcast'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: PodcastListComponent,
        data: {
          title: 'Data'
        }
      },
      {
        path: 'detail/:id',
        component: PodcastDetailComponent,
        data: {
          title: 'Rincian'
        }
      },
      {
        path: 'add',
        component: PodcastAddComponent,
        data: {
          title: 'Tambah'
        }
      },
      {
        path: 'edit/:id',
        component: PodcastEditComponent,
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
export class PodcastRoutingModule {}
