import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../shared/service/http.service";
import {Router} from "@angular/router";
import {API_URL} from '../../shared/constant/api.constant'
import {LayoutComponent} from "../../shared/layout/layout.component";
import {SaveDataService} from "../../shared/service/save-data.service";
import Swal from "sweetalert2";
import * as moment from "moment";

@Component({
  selector: 'app-joy-follow-up',
  templateUrl: './joy-follow-up.component.html',
  styleUrls: ['./joy-follow-up.component.scss']
})
export class JoyFollowUpComponent implements OnInit {
  first = 0;
  rows = 10;
  listJoy: ListJoy[] | any = null;
  constructor(public SaveDataService: SaveDataService, public _http: HttpService, private router: Router, public layout: LayoutComponent) {
  }

  ngOnInit(): void {
    this.loadData()
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
    return this.listJoy ? this.first === (this.listJoy.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.listJoy ? this.first === 0 : true;
  }

  loadData() {
    this.layout.show()
    this._http.get(API_URL.getMappingJoy, {}).subscribe(
      (res) => {
        console.log(res)
        this.layout.hide()
        this.listJoy = res
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
      text: 'คุณต้องการจะช่วยเหลือหรือไม่',
      showCancelButton: true,
      cancelButtonText: 'ไม่',
      confirmButtonText: 'ใช่',
    }).then((result) => {
      if (result.isConfirmed) {
        this.layout.show()
        this._http.post(API_URL.statusMapping, {
          mappingID: event.id,
          mappingStatus:'2'
        }).subscribe(
          (res) => {
            this.layout.hide()
            this.loadData()
          },
          (error) => {
            console.error(error)
          }
        )
      }
    });
  }
}
export interface ListJoy {
  id: string
  agencySubmissionControlStatusID: number
  agencySubmissionControlStatusNameTH: string
  agencySubmissionControlStatusNameEN: string
  agencySubmissionControlStatusColor: string
  submissionControlID: number
  submissionControlTitle: string
  submissionControlFirstName: string
  submissionControlLastName: string
  submissionControlPetition: string
  submissionControlPetitionDate: string
  submissionControlOffice: string
  submissionControlPostCode: string
  submissionControlAgencyID: number
  submissionControlAgencyNameTH: string
  submissionControlAgencyNameEN: string
  submissionControlAgencyNumber: string
  submissionControlStatusID: number
  submissionControlStatusNameTH: string
  submissionControlStatusNameEN: string
  submissiobControlCreateDate: string
  submissionControlCreateByID: string
  submissionControlCreateByName: string
  submssionControlCreateByPhotoPath: string
}
