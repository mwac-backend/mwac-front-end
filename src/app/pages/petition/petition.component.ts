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
      [this.formConfig.office.field]: new FormControl({ value: null, disabled: false }),
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


  onUploadFile(file: any) {
    console.log(this.fileControl.value);

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  loadAgencyList() {
    this.layout.show();
    this._http.get(API_URL.apiAgency, {}).subscribe(
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
    // var formData: any = new FormData();
    // formData.append(this.formConfig.id.field, this.formPetition.value[this.formConfig.id.field]);
    // formData.append(this.formConfig.title.field, this.formPetition.value[this.formConfig.title.field]);
    // formData.append(this.formConfig.firstName.field, this.formPetition.value[this.formConfig.firstName.field]);
    // formData.append(this.formConfig.lastName.field, this.formPetition.value[this.formConfig.lastName.field]);
    // formData.append(this.formConfig.agencyID.field, this.formPetition.value[this.formConfig.agencyID.field]);
    // formData.append(this.formConfig.petitionDate.field,moment(this.formPetition.value[this.formConfig.petitionDate.field]).format('YYYY-MM-DD HH:mm') );
    // formData.append(this.formConfig.petition.field, this.formPetition.value[this.formConfig.petition.field]);
    // formData.append(this.formConfig.office.field, this.formPetition.value[this.formConfig.office.field]);
    // formData.append(this.formConfig.address.field, this.formPetition.value[this.formConfig.address.field]);
    // formData.append(this.formConfig.subDistrict.field, this.formPetition.value[this.formConfig.subDistrict.field]);
    // formData.append(this.formConfig.district.field, this.formPetition.value[this.formConfig.district.field]);
    // formData.append(this.formConfig.province.field, this.formPetition.value[this.formConfig.province.field]);
    // formData.append(this.formConfig.postcode.field, this.formPetition.value[this.formConfig.postcode.field]);
    // formData.append(this.formConfig.submissionControlStatusID.field, this.formPetition.value[this.formConfig.submissionControlStatusID.field]);

    
    if (!this.formPetition.invalid) {
      const datePetition =moment(this.formPetition.value['petitionDate']).format('YYYY-MM-DD HH:mm');
      console.log(datePetition);
      this.formPetition.value['petitionDate'] = datePetition;
      // this.formPetition.controls['petitionDate'].setValue(datePetition);
      console.log(this.formPetition.value);
      this.layout.show();
      this._http.post(API_URL.submission_control, this.formPetition.value).subscribe(
        (res) => {
          if (res) {
            console.log(res);
            this.layout.showMessageNoti({ key: 'tr', severity: 'success', summary: 'Success !!', detail: 'save data success' });
            this.layout.hide();
          }
        },
        (error) => {
          console.error(error);
          this.layout.hide();
          this.layout.showMessageNoti({ key: 'tr', severity: 'error', summary: 'Error !!', detail: error.status });
        }
      )

    }else{
      this.layout.showMessageNoti({ key: 'tr', severity: 'warn', summary: 'warning !!', detail: 'กรุณาตรวสอบความถูกต้อง' });
       
    }

  }



}
