import {Component, OnInit,ViewChild} from '@angular/core';
import {HttpService} from "../../shared/service/http.service";
import {Router} from "@angular/router";
import {API_URL} from '../../shared/constant/api.constant'
import {LayoutComponent} from "../../shared/layout/layout.component";
import {SaveDataService} from "../../shared/service/save-data.service";
import Swal from "sweetalert2";
import * as moment from "moment";

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {
  first = 0;
  rows = 10;
  public userDetail:any = {}
  public submissionControl: submission[] = []
  public startDate: Date | string = moment().format("YYYY-MM-DD");
  public endDate: Date | string = moment().add(1,'day').format("YYYY-MM-DD");
  constructor(public SaveDataService:SaveDataService,public _http: HttpService, private router: Router,public layout: LayoutComponent) {
  }

  ngOnInit(): void {
    this.userDetail = JSON.parse(<string>localStorage.getItem('userDetail'))
    console.log(this.userDetail)
    this.loaddata(this.startDate, this.endDate)

  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.submissionControl ? this.first === (this.submissionControl.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.submissionControl ? this.first === 0 : true;
  }

  loaddata(startDate?: string | Date, endDate?: string | Date) {
    this.layout.show()
    this._http.get(API_URL.submission_control, {
      startDate: startDate || '',
      endDate: endDate || ''
    }).subscribe(
      (res) => {
        console.log(res)
        this.layout.hide()
        this.submissionControl = res.filter((event:any) => event.submissionControlStatusID !== 3&&event.submissionControlStatusID !== 4);
      },
      (error) => {
        this.layout.hide()
        console.error(error)
      }
    )
  }
  onRowSelect(event:any) {
    console.log(event)
    this.SaveDataService.submissionControl = event
    this.router.navigate(['/follow-up-manage'])
  }

  onRowConfirm(event: any) {
    Swal.fire({
      title: 'ยืนยัน',
      text: 'คุณต้องการจะรับคำร้องหรือไม่',
      showCancelButton: true,
      cancelButtonText: 'ไม่',
      confirmButtonText: 'ใช่',
    }).then((result) => {
      if (result.isConfirmed) {
        this.layout.show()
        this._http.post(API_URL.submissionOrder, {
          id: "",
          groupUuid: "",
          submissionControlId: event.id,
          submissionOrderStatusId: 1,
          userId: "",
          remark: event.petition
        }).subscribe(
          (res) => {
            this.layout.hide()
            this.loaddata(this.startDate, this.endDate)
          },
          (error) => {
            console.error(error)
          }
        )
      }
    });
  }
  onStartDate(event:any) {
    this.startDate = moment(event.target.value).format("YYYY-MM-DD");
    this.loaddata(this.startDate, this.endDate);
  }

  onEndDate(event:any) {
    this.endDate = moment(event.target.value).format("YYYY-MM-DD");
    this.loaddata(this.startDate, this.endDate);
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
