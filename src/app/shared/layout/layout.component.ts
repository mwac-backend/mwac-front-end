import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import {MenuItem} from 'primeng/api';
export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  items: MenuItem[] = [];
  constructor() { }
  ngOnInit(): void {

    this.items = [
      {
        label: 'หน้าหลัก',
        icon:'pi pi-fw pi-home',
      },
      {
        label: 'บริการช่วยเหลือ',
        icon:'pi pi-fw pi-pencil',
        items: [
          {
            label: 'ยื่นคำร้อง',
            icon:'pi pi-fw pi-angle-right'
          },
          {
            label: 'ติดตามการช่วยเหลือ',
            icon:'pi pi-fw pi-angle-right'
          },
        ]
      },
      {
        label: 'ผลการดำเนินงาน',
        icon:'pi pi-fw pi-align-justify',
      },
    ]
  }

}
