import {Component, OnInit,ViewChild} from '@angular/core';
import {HttpService} from "../../shared/service/http.service";
import {Router} from "@angular/router";
import {API_URL} from '../../shared/constant/api.constant'
import {LayoutComponent} from "../../shared/layout/layout.component";
import {SaveDataService} from "../../shared/service/save-data.service";
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
      agencyId: 1,
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
