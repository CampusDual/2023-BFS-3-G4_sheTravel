import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  // { id: 'myprofile', name: 'MY PROFILE', icon: 'profile', opened: true,
  //   items: [
  // { id: 'userinfo', name: 'USER', user: 'Profile', avatar: '../../assets/images/user_profile.png' }
  // ]},
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'destination', name: 'DESTINATION', icon: 'explore', route: '/main/communities' },
  { id: 'reservations', name: 'RESERVATION', icon: 'mail', route: '/main/reservations' },


];
