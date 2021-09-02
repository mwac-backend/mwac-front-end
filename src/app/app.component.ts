import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

   public selectedCities: Array<any> = [];
   title = "mwac-front-end"
  constructor(private primengConfig: PrimeNGConfig) {}
    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}