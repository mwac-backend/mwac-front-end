import { BreakpointObserver } from "@angular/cdk/layout";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation
} from "@angular/core";
import {Router} from "@angular/router";
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
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild("drawer", {static: true}) drawer: any;
  items: MenuItem[] = [];

  constructor(private observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    console.log(window.innerWidth)
    console.log(document.documentElement.clientWidth)
    console.log(document.getElementsByTagName('body')[0])
    this.items = [
      {
        label: 'หน้าหลัก',
        icon: 'pi pi-fw pi-home',
      },
      {
        label: 'บริการช่วยเหลือ',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'ยื่นคำร้อง',
            icon: 'pi pi-fw pi-angle-right'
          },
          {
            label: 'ติดตามการช่วยเหลือ',
            icon: 'pi pi-fw pi-angle-right'
          },
        ]
      },
      {
        label: 'ผลการดำเนินงาน',
        icon: 'pi pi-fw pi-align-justify',
      },
    ]
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    });
  }
  btn() {
    this.drawer.toggle()
  }

}
