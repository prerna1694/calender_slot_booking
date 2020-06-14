import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  formError = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
  }

  async ngOnInit() {
    this.submitted = false;

    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      loginAs: new FormControl('', [
        Validators.required
      ])
    });

    
  }

  /**
   * Method is called with click on submit of login form.
   * Used to authenticate the user with provided credentials username and password
   * and save server response access token credentials in local storage
   *
   */
  loginUser() {
    this.formError = '';
    this.submitted = true;

    const userName = this.loginForm.value.userName;
    const password = this.loginForm.value.password;
    
    if (!userName || !password ) {
      this.formError = 'All fields are required';
      return;
    }

    const data = this.loginForm.value;
    if (userName!="")

        {
          console.log("abc");
          this.router.navigate(['/owner/dashboard']);


        };

  }

  /**
   * Navigate user to user level wise endpoint
   */
  private async navigateUser() {
 //   await this.router.navigate(['/' + this.Auth.userType()]);
  }
}
