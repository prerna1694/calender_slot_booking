import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppointmentRouting} from './appointment.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {ShowAppointmentComponent} from './show-appointment/show-appointment.component';

@NgModule({
  declarations: [
    ShowAppointmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppointmentRouting),
    ReactiveFormsModule,
    NgbModalModule,
    BsDatepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [ShowAppointmentComponent]
})
export class AppointmentModule { }
