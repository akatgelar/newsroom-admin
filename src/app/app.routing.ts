import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';


// tslint:disable: max-line-length
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'log',
        loadChildren: () => import('./views/log/log.module').then(m => m.LogModule)
      },
      {
        path: 'artikel',
        loadChildren: () => import('./views/artikel/artikel.module').then(m => m.ArtikelModule)
      },
      {
        path: 'slider',
        loadChildren: () => import('./views/slider/slider.module').then(m => m.SliderModule)
      },
      {
        path: 'video',
        loadChildren: () => import('./views/video/video.module').then(m => m.VideoModule)
      },
      {
        path: 'podcast',
        loadChildren: () => import('./views/podcast/podcast.module').then(m => m.PodcastModule)
      },
      {
        path: 'koran',
        loadChildren: () => import('./views/koran/koran.module').then(m => m.KoranModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users-data/users-data.module').then(m => m.UsersDataModule)
      },
      {
        path: 'users-level',
        loadChildren: () => import('./views/users-level/users-level.module').then(m => m.UsersLevelModule)
      },
      {
        path: 'password',
        loadChildren: () => import('./views/password/password.module').then(m => m.PasswordModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
