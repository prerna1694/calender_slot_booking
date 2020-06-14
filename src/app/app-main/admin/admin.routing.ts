import {Routes} from '@angular/router';

export const adminRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: 'appointment', loadChildren: './appointments/appointment.module#AppointmentModule'},
  { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule'},
];
