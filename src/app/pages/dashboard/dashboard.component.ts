import {Component, OnInit} from '@angular/core';
import {LayoutComponent} from '../../shared/layout/layout.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public layout: LayoutComponent,) {
  }

  ngOnInit(): void {
    // this.layout.show()
  }
  test(){
    this.layout.show()
    this.layout.showMessageNoti({key: 'tr', severity:'info', summary: 'Test', detail: 'ทดสอบจ้า'});
  }
}
