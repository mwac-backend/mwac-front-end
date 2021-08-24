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
      this.loadHade(this.data)
      this.loadBody(this.data)

    } else {
      this.router.navigate(['follow-up'])
    }
  }

  public hade: any = []
  public body: any = []

  loadHade(data: any) {
    this.layout.sShow()
    this._http.get(API_URL.submissionOrder, {id:data.id}).subscribe(
      (res) => {
        console.log(res)
        this.hade = res
        this.layout.shide()
      },
      (error) => {
        console.error(error)
      }
    )
  }

  loadBody(data: any) {
    this.layout.sShow()
    this._http.get(API_URL.orderDocument, {submissionOrderId:data.id}).subscribe(
      (res) => {
        console.log(res)
        this.body = res
        this.layout.shide()
      },
      (error) => {
        console.error(error)
      }
    )
  }
}
