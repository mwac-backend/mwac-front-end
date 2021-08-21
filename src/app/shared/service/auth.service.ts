import { Injectable } from '@angular/core';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  onLogout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login']).then(r => {})
  }
}
