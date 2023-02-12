import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersLevelListComponent } from './users-level-list/users-level-list.component';
import { UsersLevelDetailComponent } from './users-level-detail/users-level-detail.component';
import { UsersLevelAddComponent } from './users-level-add/users-level-add.component';
import { UsersLevelEditComponent } from './users-level-edit/users-level-edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User Level'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: UsersLevelListComponent,
        data: {
          title: 'User Level List'
        }
      },
      {
        path: 'detail/:id',
        component: UsersLevelDetailComponent,
        data: {
          title: 'User Level Detail'
        }
      },
      {
        path: 'add',
        component: UsersLevelAddComponent,
        data: {
          title: 'User Level Add'
        }
      },
      {
        path: 'edit/:id',
        component: UsersLevelEditComponent,
        data: {
          title: 'User Level Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersLevelRoutingModule {}
