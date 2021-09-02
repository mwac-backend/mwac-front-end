import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileValidators } from 'ngx-file-drag-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, MessageService } from 'primeng/api';
import { API_URL } from 'src/app/shared/constant/api.constant';
import { formPetitionConfigs } from 'src/app/shared/constant/form-petition.constant';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { HttpService } from 'src/app/shared/service/http.service';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  submissionControlAll: any = [];
  submissionControlAllFilter: any = [];

  loading = false;
  valueControlStatus: any = 0;
  valueAgency: any = 0;

  countAll = 0;
  countSuccess = 0;
  countInProgress = 0;
  countWaiting = 0;

  agencyList:any = [];
  controlStatus:any = [];


  constructor(
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    public _http: HttpService,
    private router: Router,
    public spinner: NgxSpinnerService,
    public layout: LayoutComponent
  ) {
    
  }


  ngOnInit(): void {
    this.loadSubmissionControlAll();
    this.loadAgencyList();
    this.loadControlStatusList();

  }

  loadSubmissionControlAll() {
    const startDate = undefined;
    const endDate = undefined;
    // startDate:'2021-08-30',endDate:'2021-08-31' 
    this.layout.show();
    this._http.get(API_URL.submission_control_all, { }).subscribe(
      (res) => {
        if (res) {
          this.submissionControlAll = res.filter((data: any) => data.submissionControlStatusID !== 4);
          this.submissionControlAllFilter = res.filter((data: any) => data.submissionControlStatusID !== 4);
          this.countAll = this.submissionControlAllFilter.length;
          this.countSuccess = this.submissionControlAllFilter.filter((data: any) => data.submissionControlStatusID === 3).length;
          this.countInProgress = this.submissionControlAllFilter.filter((data: any) => data.submissionControlStatusID === 2).length;
          this.countWaiting = this.submissionControlAllFilter.filter((data: any) => data.submissionControlStatusID === 1).length;

          this.filterList(this.valueAgency,this.valueControlStatus);
          console.log(res);
          this.layout.hide();
        }
      },
      (error) => {
        console.error(error);
        this.layout.hide();
        // this.layout.showMessageNoti({key: 'tr', severity:'error', summary: 'Error', detail: error.status});
      }
    )
  }

  loadAgencyList() {
    this.layout.show();
    this._http.get(API_URL.apiAgency, { }).subscribe(
      (res) => {
        if (res) {
          const obj = [{agencyNameTH: "ทั้งหมด",id: 0}];
          this.agencyList= _.union(obj, res);
          console.log(res);
          this.layout.hide();
        }
      },
      (error) => {
        console.error(error);
        this.layout.hide();}
    )
  }

  loadControlStatusList() {
    this.layout.show();
    this._http.get(API_URL.getSubmissionControlStatus, { }).subscribe(
      (res) => {
        if (res) {
          const obj = [{nameTH: "ทั้งหมด",id: 0}];
          this.controlStatus= _.union(obj, res).filter((data: any) => data.id !== 4);
          console.log(res);
          this.layout.hide();
        }
      },
      (error) => {
        console.error(error);
        this.layout.hide();}
    )
  }

  filterList(agency:number,status:number){
   if(agency === 0 && status === 0 ){
    this.submissionControlAll = this.submissionControlAllFilter;
   }else if(agency !== 0 && status === 0){
    this.submissionControlAll = this.submissionControlAllFilter.filter((data: any) => data.agencyID == agency);
   }else if(agency === 0 && status !== 0 ){
    this.submissionControlAll = this.submissionControlAllFilter.filter((data: any) => data.submissionControlStatusID == status);
   
   }
   else{
      this.submissionControlAll = this.submissionControlAllFilter.filter((data: any) => data.agencyID == agency && data.submissionControlStatusID == status);

   }
  }

 

}
