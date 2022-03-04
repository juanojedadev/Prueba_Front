import { FormControl, Validators } from '@angular/forms';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@dataelements/services/auth.service';
import { CustomErrorStateMatcher } from '@coreelements/validator/MatcherError';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }
  isChecked = false;
  type = 'visibility';
  user: string = '';
  password: string = '';
  loginForm!:FormGroup;

  matcherError = new CustomErrorStateMatcher();

  _subscribers$: Array<Subscription> = [];

  ngOnInit(): void {
    this.validateLoginForm();
  }

  ngOnDestroy(): void {
      this._subscribers$.forEach(responses => {
        responses.unsubscribe();
      })
  }


  validateLoginForm(): void{
    this.loginForm = this.formBuilder.group({
        correo: new FormControl('', {validators: [Validators.required, Validators.email]}),
        clave: new FormControl('', {validators: [Validators.required]})
    });
  }

  changeProperty(): void{
    const option = !this.isChecked?'visibility_off':'visibility';
    this.type = option;
    this.isChecked = !this.isChecked;
  }

  iniciarSesion(): void{
    if(this.loginForm.invalid){
      Swal.fire({
        title: 'Error',
        text: 'You must complete the form',
        timer: 6000,
        icon:'error',
        toast:true,
        iconColor: 'white',
        position:'top-right',
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
          popup: 'colored-toast'
        }
      });

      return;
    }

     const response = this.authService.authenticateUserAdmin(this.correo?.value, this.clave?.value).subscribe(p => {
      if(p){
        this.router.navigate(['/home/welcome']);
      }
    });

    this._subscribers$.push(response);
  }

  get correo() {return this.loginForm!.get('correo')};
  get clave () {return this.loginForm!.get('clave')};

}
