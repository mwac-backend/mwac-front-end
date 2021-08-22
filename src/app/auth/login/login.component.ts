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
import {LayoutComponent} from '../../shared/layout/layout.component'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public myLogin: FormGroup;
  public formConfig = Login.form

  constructor(private _formBuilder: FormBuilder, public _http: HttpService, private router: Router,public layout:LayoutComponent) {
    this.myLogin = this._formBuilder.group({
      [this.formConfig.username.field]: new FormControl({value: null, disabled: false}),
      [this.formConfig.password.field]: new FormControl({value: null, disabled: false}),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']).then(r => {
      })
    }
  }

  login() {
    this.layout.sShow()
    console.log(this.myLogin.value)
    this._http.post_no_token(API_URL.login, this.myLogin.value).subscribe(
      (res) => {
        this.layout.shide()
        console.log(res)
        localStorage.setItem('token', res.accessToken )
        this.router.navigate(['/dashboard']).then(r => {
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
}
