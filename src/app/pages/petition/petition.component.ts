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
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.scss']
})
export class PetitionComponent implements OnInit {

  fileControl = new FormControl(
    [],
    [FileValidators.maxFileCount(5)]
  )
  public formConfig = formPetitionConfigs.form
  agencyList: any = [];
  formPetition: FormGroup;

  constructor(private messageService: MessageService,
    private _formBuilder: FormBuilder,
    public _http: HttpService,
    private router: Router,
    public spinner: NgxSpinnerService,
    public layout: LayoutComponent) {
    this.formPetition = this._formBuilder.group({
      [this.formConfig.id.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.title.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.firstName.field]: new FormControl({ value: null, disabled: false }, Validators.compose([Validators.required])),
      [this.formConfig.lastName.field]: new FormControl({ value: null, disabled: false }, Validators.compose([Validators.required])),
      [this.formConfig.agencyID.field]: new FormControl({ value: null, disabled: false }, Validators.compose([Validators.required])),
      [this.formConfig.petitionDate.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.petition.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.office.field]: new FormControl({ value: null, disabled: false }, Validators.compose([Validators.required])),
      [this.formConfig.address.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.subDistrict.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.district.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.province.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.postcode.field]: new FormControl({ value: null, disabled: false }),
      [this.formConfig.submissionControlStatusID.field]: new FormControl({ value: 1, disabled: false })

    });
  }

  ngOnInit(): void {
    this.loadAgencyList();

    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  // this.layout.showMessageNoti({key: 'tr', severity:'warn', summary: 'Error', detail:'Add file'});
  // this.layout.showMessageNoti({key: 'tr', severity:'error', summary: 'Error', detail:'Add file'});
  // this.layout.showMessageNoti({key: 'tr', severity:'success', summary: 'Error', detail:'Add file'});
  // this.layout.showMessageNoti({key: 'tr', severity:'info', summary: 'Error', detail:'Add file'});

  onUploadFile(file: any) {
    if (this.fileControl.value.length > 5) {
      this.fileControl.value.splice(5, this.fileControl.value.length - 5);
      this.layout.showMessageNoti({ key: 'tr', severity: 'warn', summary: 'Warning', detail: 'You can add up to 5 files.' });
    } else {
      this.layout.showMessageNoti({ key: 'tr', severity: 'success', summary: 'Success', detail: 'Add files success.' });
    }

    console.log(this.fileControl.value);
  }

  loadAgencyList() {
    this.layout.show();
    this._http.get(API_URL.apiAgency, { }).subscribe(
      (res) => {
        if (res) {
          this.agencyList = res;
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

  submitData() {
    if (!this.formPetition.invalid) {

      const datePetition = moment(this.formPetition.value['petitionDate']).format('YYYY-MM-DD HH:mm');
      this.formPetition.value['petitionDate'] = datePetition;

      this.layout.show();
      this._http.post(API_URL.submission_control, this.formPetition.value).subscribe(
        (res) => {
          if (res) {
            console.log(res);
            if (this.fileControl.value.length > 0) {
              this.saveSubmissionDocument(res[0].submissionControlID);
            } else {
              this.layout.showMessageNoti({ key: 'tr', severity: 'success', summary: 'Success !!', detail: 'save data success' });
              this.layout.hide();
              this.router.navigate(['/follow-up']);
            }
            this.formPetition.reset();
          }
        },
        (error) => {
          console.error(error);
          this.layout.hide();
          this.layout.showMessageNoti({ key: 'tr', severity: 'error', summary: 'Error !!', detail: error.status });
        }
      )

    } else {
      this.layout.showMessageNoti({ key: 'tr', severity: 'warn', summary: 'warning !!', detail: 'กรุณาตรวสอบความถูกต้อง' });
    }

  }

  saveSubmissionDocument(submissionControlId: any) {

    var formData: any = new FormData();
    formData.append('id', '');
    formData.append('submissionControlId', submissionControlId);
    formData.append('remark', 'Add submission document.');

    this.fileControl.value.forEach((element: any) => {
      formData.append('pathFile', element);
    });

    this._http.post(API_URL.submission_control_document, formData).subscribe(
      (res) => {
        this.layout.showMessageNoti({ key: 'tr', severity: 'success', summary: 'Success !!', detail: 'save data success' });
        this.layout.hide();
        this.fileControl.value.splice(0, this.fileControl.value.length);
        this.router.navigate(['/follow-up']);
      },
      (error) => {
        console.error(error);
        this.layout.hide();
        this.layout.showMessageNoti({ key: 'tr', severity: 'error', summary: 'Error !!', detail: error.status });
      }
    )
  }



}
