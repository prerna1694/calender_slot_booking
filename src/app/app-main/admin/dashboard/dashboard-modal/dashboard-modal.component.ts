import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

interface DiscountDataInput {
  title: string;
  type: string;
}

@Component({
  selector: 'app-dashboard-modal',
  templateUrl: './dashboard-modal.component.html',
  styleUrls: ['./dashboard-modal.component.scss']
})
export class DashboardModalComponent implements OnInit {

  selectedData;
  @Input() data: DiscountDataInput;
  @Output() modalEvent = new EventEmitter();
  discountAmounts: any[] = [];

  selectFieldRequired = false;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    
  }

  submit(): void {
    this.modalEvent.emit(this.selectedData);
    this.activeModal.close('Close click');
  }

  /**
   * Get list of amounts to select from
   * @param $event Event
   */
  getAmount($event: Event) {
    const selectedValue = ($event.target as HTMLInputElement).value;

    if (!selectedValue) {
      this.toastr.error(
        'Select Discount type from the dropdown',
        'Error'
      );
      return;
    }

  }

  /**
   * Filter amounts list
   * @param selectedValue SelectedDiscount id
   */
}
