import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersDataListComponent } from './users-data-list/users-data-list.component';
import { UsersDataDetailComponent } from './users-data-detail/users-data-detail.component';
import { UsersDataAddComponent } from './users-data-add/users-data-add.component';
import { UsersDataEditComponent } from './users-data-edit/users-data-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: UsersDataListComponent,
        data: {
          title: 'Data List'
        }
      },
      {
        path: 'detail/:id',
        component: UsersDataDetailComponent,
        data: {
          title: 'Data Detail'
        }
      },
      {
        path: 'add',
        component: UsersDataAddComponent,
        data: {
          title: 'Data Add'
        }
      },
      {
        path: 'edit/:id',
        component: UsersDataEditComponent,
        data: {
          title: 'Data Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersDataRoutingModule {}
