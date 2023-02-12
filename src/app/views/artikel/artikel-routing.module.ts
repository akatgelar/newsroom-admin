import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtikelListComponent } from './artikel-list/artikel-list.component';
import { ArtikelDetailComponent } from './artikel-detail/artikel-detail.component';
import { ArtikelAddComponent } from './artikel-add/artikel-add.component';
import { ArtikelEditComponent } from './artikel-edit/artikel-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Artikel'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ArtikelListComponent,
        data: {
          title: 'Data'
        }
      },
      {
        path: 'detail/:id',
        component: ArtikelDetailComponent,
        data: {
          title: 'Rincian'
        }
      },
      {
        path: 'add',
        component: ArtikelAddComponent,
        data: {
          title: 'Tambah'
        }
      },
      {
        path: 'edit/:id',
        component: ArtikelEditComponent,
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
export class ArtikelRoutingModule {}
