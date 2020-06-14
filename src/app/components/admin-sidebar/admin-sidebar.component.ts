import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})

export class AdminSidebarComponent implements AfterViewInit {

  navbarVal = false;

  constructor() { }

  ngAfterViewInit() {
    const contents = [].slice.call(document.querySelectorAll('.content'));

    contents.map(content => {
      function toggleSublinks() {
        if (content.classList.contains('has-child')) {
          const sublink = content.nextSibling;

          sublink.classList.toggle('sub-link-hide');
        }
      }

      content.addEventListener('click', () => {
        toggleSublinks();
      });

      toggleSublinks();
    });

    // const contents = [].slice.call(document.querySelectorAll('.content'));

    // contents.map(content => {
    //   content.addEventListener('click', () => {
    //     const childContent = content.nextSibling;

    //     if (content.classList.contains('has-child')) {
    //       this.navbarVal = false;
    //       childContent.classList.toggle('d-none');
    //     }
    //   });
    // });
  }

  toggle_navbar(): void {
    this.navbarVal = !this.navbarVal;
  }

}
