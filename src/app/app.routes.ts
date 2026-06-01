import { Routes } from '@angular/router';
import { Home } from './components/home/home'; 
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  // C'EST ICI QUE CA CHANGE : on affiche Home, pas App
  { path: '', component: Home }, 
  { path: 'admin-secret', component: Dashboard }, 
];