import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DashboardModalComponent} from '../dashboard-modal/dashboard-modal.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  offerOptions = {
    DISCOUNT_DOLLAR: 1,
    DISCOUNT_PERCENTILE: 2,
    PROMO: 3
  };

  offerSelected: any;

  // Store all the services and the technician selected for the customer.
  // The customer will pay only for the technician and the services selected.

  discountedTotal: number;
  private salonId: number;

  // Store list of available technicians from saved technicians list from TechnicianService

  // Store default technician. Default technician is the technician selected from main-screen 1

  // Store all categories and their related services. Should be fetched from the server

  // Store the index of the selected category from the category toggle list.
  categorySelected: number;

  // Store the list of services under the selected category

  // Store all the services available through out the categories. Used to display in the change service drop-down list

  // Store list of discounts and promotions

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {


    // Get `id` from url parameter. `id` is the index of the technician selected from saved technicians
    // list from select technician page
    const technicianIndex = this.route.snapshot.paramMap.get('id');
    // Get list of technicians saved in the technicianService

    // Technician list is empty. Redirect to select technician page
    

    // Extract selected technician as default technician

    // Get list of categories along with list of services

    // Get discounts

  }

  /**
   * Select the services associated from the selected category
   * @param categoryId Category id for which services has to be choosen
   */
  selectService(categoryId): void {
    this.categorySelected = categoryId;
  }

  /**
   * TODO: To be implemented
   * @param offer Offer choosen
   */
  open(offer) {
    console.log(offer);
    const modalRef = this.modalService.open(DashboardModalComponent);

    // Data to be passed to Modal
    const modalData = {
      title: '',
      arr: [],
      type: ''
    };

    

    // pass data to modal
    modalRef.componentInstance.data = modalData;

    // get response from modal
    modalRef.componentInstance.modalEvent.subscribe(res => {
      this._calculateDiscount(res);
    });
  }

  /**
   * Calculate discount
   * @param discountValue Value to subtract
   */
  private _calculateDiscount(discountValue: string) {
    let discountType = 'dollar';

    if (discountValue.indexOf('%') > -1) {
      discountType = 'percentage';
    }

    const discountValueNum = parseFloat(discountValue.replace( /[^\d\.]*/g, ''));
    this.offerSelected = discountValueNum;

    

    
  }

  /**
   * Add the selected service to the list of selected services to be given to the customer.
   * Customer will for the services selected only.
   * @param selectedService Service selected
   */
  

  /**
   * Delete a service from the selected services list.
   * @param index Index of the selected service to be deleted
   */
  
  /**
   * Update the selected service. Called from the selected services table, service list.
   * @param $event Event occurred. This contains the value from the select field as target.value
   * @param i Index of the chosen service list. The value will be updated for this index only.
   */
  

  /**
   * Change technician for the selected service. Called from the selected services table, technician list.
   * @param $event Event occurred. This contains the value from the select field as target.value
   * @param index Index of the chosen service list. The value will be updated for this index only.
   */
  
  /**
   * Extract all services.
   * Extract all available services through out the categories list. This list has to be
   * rendered in the selected services table to change the service.
   */
  

  /**
   * Called on click trigger of Pay action button. Save the data and move to pay page
   */
  

  /**
   * Filter discounts and promos
   * @param discountGroup Discount group like discount or promotion
   * @param discountType Discount type to filter against
   */
  
}
