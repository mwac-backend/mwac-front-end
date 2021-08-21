import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import {HttpService} from '../../shared/service/http.service'
import {API_URL} from '../../shared/constant/api.constant'
import {Login} from '../../shared/constant/form.constant'
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public myLogin: FormGroup;
  public formConfig = Login.form

  constructor(private _formBuilder: FormBuilder, public _http: HttpService, private router: Router) {
    this.myLogin = this._formBuilder.group({
      [this.formConfig.username.field]: new FormControl({value: null, disabled: false}),
      [this.formConfig.password.field]: new FormControl({value: null, disabled: false}),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']).then(r => {})
    }
  }

  login() {
    console.log(this.myLogin.value)
    localStorage.setItem('token', '1')
    this.router.navigate(['/dashboard']).then(r => {
    })
  }
}
