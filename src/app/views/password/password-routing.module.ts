import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordComponent } from './password.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Password'
    },
    children: [
      {
        path: '',
        redirectTo: 'password'
      },
      {
        path: 'password',
        component: PasswordComponent,
        data: {
          title: 'Password'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule {}
