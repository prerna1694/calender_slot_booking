import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ScheduleRouting} from './schedule.routing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {ShowScheduleComponent} from './show-schedule/show-schedule.component';

@NgModule({
  declarations: [
    ShowScheduleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ScheduleRouting),
    ReactiveFormsModule,
    NgbModalModule,
    BsDatepickerModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [ShowScheduleComponent]
})
export class ScheduleModule { }
