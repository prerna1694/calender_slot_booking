import { Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

function pickRandomColor(allcolors: {}) {
  return allcolors[Object.keys(allcolors)[Math.floor(Math.random() * Object.keys(allcolors).length)]];
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  purple: {
    primary: '#A411EE',
    secondary: '#ff4747'
  },
  green: {
    primary: '#5AB649',
    secondary: '#67da8e'
  },
  aqua: {
    primary: '#01A7FE',
    secondary: '#01FED7'
  },
  orange: {
    primary: '#F3430C',
    secondary: '#F6693C'
  },
  brown: {
    primary: '#9F3F10',
    secondary: '#e38151'
  },
  gray: {
    primary: '#F3430C',
    secondary: '#cbc3c8'
  }
};

@Component({
  selector: 'app-show-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './show-schedule.component.html',
  styleUrls: ['./show-schedule.component.css']
})
export class ShowScheduleComponent implements OnInit {

  technicians: any;

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Imran',
    },
    {
      start: startOfDay(new Date()),
      title: 'Anuj',
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Abhishek',
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      title: 'Radhe',
    }
  ];

  activeDayIsOpen = true;

  modalForm = {
    technicianName: '',
    technicianPhone: '',
    timeIn: '',
    timeOut: ''
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modal: NgbModal,
    private utilityService: UtilitiesService,
  ) {
  }

  ngOnInit() {
    // get technician details
      

  }

  toCalendarFormat(technicians) {
    let calendarSchedule: Array<CalendarEvent> = [];

    technicians.forEach(technician => {
      // color to reprsent a technician
      const color = pickRandomColor(colors);

      let dailySchedule: Array<CalendarEvent> = [];

      technician.workSchedules.breakup.forEach(schedule => {
        // technician name and timings
        let title = this.utilityService.capitalizeFirstLetter(technician.firstName) + ' ' +
          this.utilityService.capitalizeFirstLetter(technician.lastName);

        title += `: ${schedule.fromTime} - ${schedule.toTime}`;

        const momentStart = schedule.date + ' ' + schedule.fromTime;
        const momentEnd = schedule.date + ' ' + schedule.toTime;

        // technician start and end date & time
        const start = moment(momentStart,
          'MM-DD-YYYY hh:mm a').toDate();
        const end = moment(momentEnd,
          'MM-DD-YYYY hh:mm a').toDate();

        // meta data
        const meta = {
          technicianName: technician.firstName + ' ' + technician.lastName,
          technicianPhone: technician.phoneNo,
          timeIn: schedule.fromTime,
          timeOut: schedule.toTime
        };

        dailySchedule = [...dailySchedule, {
          title,
          start,
          end,
          color,
          meta
        }];
      });

      calendarSchedule = [...calendarSchedule, ...dailySchedule];
    });

    this.events = calendarSchedule;
    console.log('calendar schedule', calendarSchedule);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalForm = {...event.meta};
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
