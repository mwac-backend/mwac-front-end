import {Component, OnInit, Inject} from '@angular/core';
import {SaveDataService} from '../../../shared/service/save-data.service';
import {Router} from '@angular/router';
import {HttpService} from '../../../shared/service/http.service';
import {API_URL} from '../../../shared/constant/api.constant';
import {LayoutComponent} from '../../../shared/layout/layout.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidators} from 'ngx-file-drag-drop';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import Swal from 'sweetalert2';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';


@Component({
  selector: 'app-follow-up-manage',
  templateUrl: './follow-up-manage.component.html',
  styleUrls: ['./follow-up-manage.component.scss'],
  animations: [
    trigger('popOverState', [
      state(
        'show',
        style({
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('200ms ease-in')),
    ]),
  ],
})
export class FollowUpManageComponent implements OnInit {
  public data: any = {};
  hideRequiredControl = new FormControl(false);

  constructor(
    public SaveDataService: SaveDataService,
    private router: Router,
    public _http: HttpService,
    public layout: LayoutComponent,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    console.log(this.SaveDataService.submissionControl);
    if (this.SaveDataService.submissionControl) {
      this.loadData(this.SaveDataService.submissionControl)
      this.loadorder(this.SaveDataService.submissionControl);
    } else {
      this.router.navigate(['follow-up']);
    }
  }

  loadData(submissionControlId: any){
    this._http.get(API_URL.getsubmissionControlById,{
      submissionControlId
    }).subscribe(
      (res)=>{
        this.data = res[0]
      },(err)=>{
        console.error(err)
      }
    )
  }
  public order: any = [];
  public order_key: any = [];

  loadorder(id: any) {
    this.order = [];
    this.order_key = [];
    this.layout.show();
    this._http.get(API_URL.submissionOrder, {id}).subscribe(
      (res) => {
        console.log(res);
        this.order = res.reduce((r: { [x: string]: any; }, a: { groupUUID: string | number; }) => {
          r[a.groupUUID] = [...(r[a.groupUUID] || []), a];
          return r;
        }, {});
        for (let key in this.order) {
          this.order_key.push(key);
        }
        console.log(this.order_key)
        console.log(this.order)
        this.layout.hide();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  show = false;

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    this.show = !this.show;
  }


  openDialog(uuid: string, type: string) {
    let dialogRef = this.dialog.open(FollowManageDialoComponent, {
      data: {type, uuid, submissionControl: this.data},
      height: '80vh',
      width: '40vw'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result)
        this.loadorder(this.SaveDataService.submissionControl);
      }
    });
  }

  fileName(pate: string) {
    return pate.replace(/^.*[\\\/]/, '')
  }
}


@Component({
  selector: 'app-follow-manage-dialo',
  templateUrl: './followmanagedialo.html',
  styleUrls: ['./follow-up-manage.component.scss'],
})
export class FollowManageDialoComponent implements OnInit {
  constructor(
    public _http: HttpService,
    public layout: LayoutComponent,
    public dialogRef: MatDialogRef<FollowManageDialoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public agency: any
  public orderStatus: any
  public remark: string | undefined
  public status: any = {}
  public selectedStatus = false
  public agencyList: any = [];
  public userList: any = {}
  public agencyId: null | string | number = null;
  public userId: null | string | number = null;

  fileControl = new FormControl(
    [],
    [FileValidators.maxFileCount(5)]
  )

  ngOnInit(): void {
    this.loadsubmissionControlStatus()
    this.loadAgency()
    this.loadAgencyList()
    console.log(this.data.uuid)
    console.log(this.data.submissionControl.id)
  }

  onUploadFile(file: any) {
    console.log(this.fileControl.value);
    // this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  onNoClick(res: any): void {
    this.dialogRef.close(res);
  }

  loadAgencyList(){
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
      }
    )
  }

  save() {
    Swal.fire({
      title: 'ยืนยัน',
      text: 'คุณต้องการจะรดำเนินการต่อหรือไม่',
      showCancelButton: true,
      cancelButtonText: 'ไม่',
      confirmButtonText: 'ใช่',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log({
          id: '',
          groupUuid: this.data.uuid,
          submissionControlId: this.data.submissionControl.id,
          submissionOrderStatusId: this.selectedStatus && this.status ? this.status.id : '',
          agencyId: '',
          userId: '',
          remark: this.remark ? this.remark : '',
        })
        this.layout.show()
        this._http
          .post(API_URL.submissionOrder, {
            id: '',
            groupUuid: this.data.uuid,
            submissionControlId: this.data.submissionControl.id,
            submissionOrderStatusId: this.selectedStatus && this.status ? this.status.id : '',
            agencyId: this.agencyId?this.agencyId:'',
            userId: this.userId?this.userId:'',
            remark: this.remark,
          })
          .subscribe(
            (res) => {
              console.log(res)
              console.log(this.fileControl.value);
              if (this.fileControl.value.length !== 0) {
                this.saveFile(res[0].submissionOrderID)
              } else {
                this.layout.hide()
                this.layout.showMessageNoti({key: 'tr', severity: 'info', summary: 'สำเร็จ', detail: 'ดำเนินการแล้ว'});
                this.onNoClick(res)
              }
            },
            (error) => {
              console.error(error);
            }
          );
      }
    });
  }

  saveFile(submissionOrderId: number) {
    console.log(submissionOrderId)
    const formData = new FormData();
    formData.append('id', '');
    formData.append('submissionOrderId', `${submissionOrderId}`)
    formData.append('remark', 'Add document.');
    this.fileControl.value.forEach((element: any) => {
      formData.append('pathFile', element);
    });
    console.log(formData.getAll('id'), formData.getAll('submissionOrderId'), formData.getAll('remark'), formData.getAll('pathFile'))
    this._http.post(API_URL.orderDocument, formData).subscribe(
      (res) => {
        console.log(res)
        this.layout.hide()
        this.layout.showMessageNoti({key: 'tr', severity: 'info', summary: 'สำเร็จ', detail: 'ดำเนินการแล้ว'});
        this.onNoClick(res)
      },
      (err) => {
        console.error(err);
      }
    )
  }

  loadsubmissionControlStatus() {
    this.layout.show()
    this._http.get(API_URL.getsubmissionOrderStatus, {}).subscribe(
      (res) => {
        this.orderStatus = res
        this.layout.hide()

      },
      (error) => {
        console.error(error)
        this.layout.hide()

      }
    )
  }

  loadAgency() {
    this.layout.show()
    this._http.get(API_URL.apiAgency, {}).subscribe(
      (res) => {
        this.agency = res
        this.layout.hide()
      },
      (error) => {
        console.error(error)
        this.layout.hide()

      }
    )
  }
  listUserByAgency(e:any){
    this.layout.show()
    console.log(e)
    this._http.get(API_URL.listUserByAgency, {agencyId:e}).subscribe(
      (res) => {
        this.userList = res
        this.layout.hide()
      },
      (error) => {
        console.error(error)
        this.layout.hide()

      }
    )
  }

  setStatus(Status: any) {
    this.status = Status
    this.selectedStatus = !this.selectedStatus
  }

  newTimeLine() {
    Swal.fire({
      title: 'ยืนยัน',
      text: 'คุณต้องการจะเพิ่มคำร้องใหม่หรือไม่',
      showCancelButton: true,
      cancelButtonText: 'ไม่',
      confirmButtonText: 'ใช่',
    }).then((result) => {
      if (result.isConfirmed) {
        this.layout.show()
        this._http.post(API_URL.submissionOrder, {
          id: "",
          groupUuid: "",
          submissionControlId: this.data.submissionControl.id,
          submissionOrderStatusId: 1,
          userId: "",
          remark: this.remark ? this.remark : '',
        }).subscribe(
          (res) => {
            if (this.fileControl.value.length !== 0) {
              this.saveFile(res[0].submissionOrderID)
            } else {
              this.layout.hide()
              this.layout.showMessageNoti({key: 'tr', severity: 'info', summary: 'สำเร็จ', detail: 'ดำเนินการแล้ว'});
              this.onNoClick(res)
            }
          },
          (error) => {
            console.error(error)
          }
        )
      }
    });
  }
  checkStatus(): any{
    if(this.status.id == 4&&this.status.id == 7){
      return !this.agencyId;
    }else {
      return false
    }
  }
}
