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
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  submissionControlAll: any = [];
  loading = false;
  valueData: any = undefined;

  countAll = 0;
  countSuccess = 0;
  countInProgress = 0;
  countWaiting = 0;

  agencyList = [
    { name: "Amy Elsner", id: 1 },
    { name: "Anna Fali", id: 2 },
    { name: "Asiya Javayant", id: 3 },
    { name: "Bernardo Dominic", id: 4 },
    { name: "Elwin Sharvill", id: 5 }
  ];

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  

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

  }

  loadSubmissionControlAll() {
    const startDate = undefined;
    const endDate = undefined;
    // startDate:'2021-08-30',endDate:'2021-08-31' 
    this.layout.show();
    this._http.get(API_URL.submission_control_all, { }).subscribe(
      (res) => {
        if (res) {
          this.submissionControlAll = res;

          this.countAll = this.submissionControlAll.length;
          this.countSuccess = this.submissionControlAll.filter((data: any) => data.submissionControlStatusID === 3).length;
          this.countInProgress = this.submissionControlAll.filter((data: any) => data.submissionControlStatusID === 2).length;
          this.countWaiting = this.submissionControlAll.filter((data: any) => data.submissionControlStatusID === 1).length;


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

}
