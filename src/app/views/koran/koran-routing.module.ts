import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KoranListComponent } from './koran-list/koran-list.component';
import { KoranDetailComponent } from './koran-detail/koran-detail.component';
import { KoranAddComponent } from './koran-add/koran-add.component';
import { KoranEditComponent } from './koran-edit/koran-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Koran'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: KoranListComponent,
        data: {
          title: 'Data'
        }
      },
      {
        path: 'detail/:id',
        component: KoranDetailComponent,
        data: {
          title: 'Rincian'
        }
      },
      {
        path: 'add',
        component: KoranAddComponent,
        data: {
          title: 'Tambah'
        }
      },
      {
        path: 'edit/:id',
        component: KoranEditComponent,
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
export class KoranRoutingModule {}
