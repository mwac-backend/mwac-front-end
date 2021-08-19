import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.scss']
})
export class PetitionComponent implements OnInit {

    items: MenuItem[] =[];
    
    home: MenuItem = {};

  constructor() { }

  ngOnInit(): void {


    this.items = [
      {label: 'ยื่นคำร้องขอความช่วยเหลือ'}
  ];
  
  this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
