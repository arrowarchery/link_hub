import { Routes } from '@angular/router';
import { App } from './app';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: App }, 
  { path: 'admin-secret', component: Dashboard }, 
];