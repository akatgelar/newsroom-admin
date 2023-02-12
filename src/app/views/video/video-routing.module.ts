import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoListComponent } from './video-list/video-list.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { VideoEditComponent } from './video-edit/video-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Video'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: VideoListComponent,
        data: {
          title: 'Data'
        }
      },
      {
        path: 'detail/:id',
        component: VideoDetailComponent,
        data: {
          title: 'Rincian'
        }
      },
      {
        path: 'add',
        component: VideoAddComponent,
        data: {
          title: 'Tambah'
        }
      },
      {
        path: 'edit/:id',
        component: VideoEditComponent,
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
export class VideoRoutingModule {}
