import {Component, OnInit} from '@angular/core';
import {SaveDataService} from "../../../shared/service/save-data.service";
import {Router} from "@angular/router";
import {HttpService} from "../../../shared/service/http.service";
import {API_URL} from '../../../shared/constant/api.constant'
import {LayoutComponent} from "../../../shared/layout/layout.component";

@Component({
  selector: 'app-follow-up-manage',
  templateUrl: './follow-up-manage.component.html',
  styleUrls: ['./follow-up-manage.component.scss']
})
export class FollowUpManageComponent implements OnInit {
  public data = {}

  constructor(public SaveDataService: SaveDataService, private router: Router, public _http: HttpService,public layout: LayoutComponent) {
  }

  ngOnInit(): void {
    console.log(this.SaveDataService.submissionControl)
    if (this.SaveDataService.submissionControl) {
      this.data = this.SaveDataService.submissionControl
      this.loadorder(this.data)

    } else {
      this.router.navigate(['follow-up'])
    }
  }

  public order: any = []

  loadorder(data: any) {
    this.layout.show()
    this._http.get(API_URL.submissionOrder, {id:data.id}).subscribe(
      (res) => {
        console.log(res)
        this.order = res
        this.layout.hide()
      },
      (error) => {
        console.error(error)
      }
    )
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
