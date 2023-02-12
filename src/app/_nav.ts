import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Dashboard',
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Log User',
    url: '/log',
    icon: 'icon-chart'
  },
  {
    title: true,
    name: 'Content',
  },
  {
    name: 'Slider',
    url: '/slider',
    icon: 'icon-screen-tablet'
  },
  {
    name: 'Artikel',
    url: '/artikel',
    icon: 'icon-book-open'
  },
  {
    name: 'Video',
    url: '/video',
    icon: 'icon-social-youtube'
  },
  {
    name: 'Podcast',
    url: '/podcast',
    icon: 'icon-social-spotify'
  },
  {
    name: 'Koran',
    url: '/koran',
    icon: 'icon-layers'
  },
  {
    title: true,
    name: 'Setting'
  },
  {
    name: 'User',
    url: '/users',
    icon: 'icon-user'
  },
  {
    name: 'User Level',
    url: '/users-level',
    icon: 'icon-shield'
  },
];
