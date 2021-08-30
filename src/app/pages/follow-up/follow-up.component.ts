import {Component, OnInit,ViewChild} from '@angular/core';
import {HttpService} from "../../shared/service/http.service";
import {Router} from "@angular/router";
import {API_URL} from '../../shared/constant/api.constant'
import {LayoutComponent} from "../../shared/layout/layout.component";
import {SaveDataService} from "../../shared/service/save-data.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {
  public userDetail:any = {}
  public submissionControl: submission[] = []
  constructor(public SaveDataService:SaveDataService,public _http: HttpService, private router: Router,public layout: LayoutComponent) {
  }

  ngOnInit(): void {
    this.userDetail = JSON.parse(<string>localStorage.getItem('userDetail'))
    console.log(this.userDetail)
    this.loaddata(this.userDetail.agencyID )

  }

  loaddata(agencyID:string|number ) {
    this.layout.show()
    this._http.get(API_URL.submission_control, {
      endDate: '',
      startDate: ''
    }).subscribe(
      (res) => {
        console.log(res)
        this.layout.hide()
        this.submissionControl = res
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
            this.loaddata(this.userDetail.agencyID )
          },
          (error) => {
            console.error(error)
          }
        )
      }
    });
  }

  // address: "11"
  // agencyID: 5
  // agencyNameEN: "System"
  // agencyNameTH: "ระบบ"
  // agencyNumber: null
  // createByID: "3"
  // createByName: "Mr. admin root"
  // createByPhotoPath: "https://book.fintechinno.com/smart-clinic/file_resource/SmartClinic/photo/currentImage/a41a9954-77e9-4127-b79b-e965c98c338e.jpg"
  // createDate: "2021-08-30T13:45:06.000Z"
  // district: "บีบี"
  // firstName: "แอ็ดมิน"
  // id: 8
  // lastName: "โอบีชีดี"
  // office: "โรงพยาบาล"
  // petition: "โดนหัวหน้าทำร้าย"
  // petitionDate: "2021-08-11T13:44:00.000Z"
  // postcode: "32000"
  // province: "ชีช๊"
  // subDistrict: "เอเอ"
  // submissionControlStatusID: 1
  // submissionControlStatusNameEN: "padding"
  // submissionControlStatusNameTH: "รอดำเนินการ"
  // title: "นาย"
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
