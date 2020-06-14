import {Routes} from '@angular/router';
import {DashboardComponent, MainPageComponent} from './index';

export const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'technician/:id', component: DashboardComponent
  }
];
