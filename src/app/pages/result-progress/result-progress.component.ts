import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../shared/service/http.service";
import {Router} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {API_URL} from "../../shared/constant/api.constant";
import {SaveDataService} from "../../shared/service/save-data.service";
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-result-progress',
  templateUrl: './result-progress.component.html',
  styleUrls: ['./result-progress.component.scss']
})
export class ResultProgressComponent implements OnInit {

  public userDetail:any = {}
  public submissionControl: submission[] = []
  constructor(public SaveDataService:SaveDataService,public _http: HttpService, private router: Router,public layout: LayoutComponent) {
  }

  public startDate: Date | string = moment().format("YYYY-MM-DD");
  public endDate: Date | string = moment().format("YYYY-MM-DD");


  ngOnInit(): void {
    this.userDetail = JSON.parse(<string>localStorage.getItem('userDetail'))
    console.log(this.userDetail)
    this.loaddata(this.userDetail.agencyID )

  }

  loaddata(agencyID:string|number ) {
    const startDate = moment(this.startDate).format("YYYY-MM-DD HH:mm:ss");
    const endDate = moment(this.endDate).format("YYYY-MM-DD HH:mm:ss");
    this.layout.show()
    this._http.get(API_URL.submission_control, {
      endDate: endDate,
      startDate: startDate
    }).subscribe(
      (res) => {
        console.log(res)
        this.layout.hide();
        // this.submissionControl = res
        this.submissionControl = res.filter((data: any) => data.submissionControlStatusID === 3);
      },
      (error) => {
        this.layout.hide()
        console.error(error)
      }
    )
  }
  onRowSelect(event:any) {
    console.log(event)
    event.fromResultProgress
    this.SaveDataService.submissionControl = event
    this.router.navigate(['/follow-up-manage'])
  }

  onStartDate(event:any) {
    this.startDate = moment(event.target.value).format("YYYY-MM-DD");
    this.loaddata(this.userDetail.agencyID);
  }

  onEndDate(event:any) {
    this.endDate = moment(event.target.value).format("YYYY-MM-DD");
    this.loaddata(this.userDetail.agencyID);
  }
 

}

export interface submission {
  id: number
  title: string
  firstName: string
  lastName: string
  petition: string
  petitionDate: string
  office: string
  address: string
  province: string
  district: string
  sub_district: string
  postcode: string
  agencyID: number
  agencyNameTH: string
  agencyNameEN: string
  agencyNumber: string
  submissionControlStatusID: number
  submissionControlStatusNameTH: string
  submissionControlStatusNameEN: string
  createDate: string
  createByID: string
  createByName: string
}
