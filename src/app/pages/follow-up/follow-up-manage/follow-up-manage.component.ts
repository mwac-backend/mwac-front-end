import {Component, OnInit, Inject} from '@angular/core';
import {SaveDataService} from '../../../shared/service/save-data.service';
import {Router} from '@angular/router';
import {HttpService} from '../../../shared/service/http.service';
import {API_URL} from '../../../shared/constant/api.constant';
import {LayoutComponent} from '../../../shared/layout/layout.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileValidators } from 'ngx-file-drag-drop';
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
  public data = {};
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
      this.data = this.SaveDataService.submissionControl;
      this.loadorder(this.data);
    } else {
      this.router.navigate(['follow-up']);
    }
  }

  public order: any = [];
  public order_key: any = [];
  loadorder(data: any) {
    this.layout.show();
    this._http.get(API_URL.submissionOrder, {id: data.id}).subscribe(
      (res) => {
        console.log(res);
        this.order = res.reduce(( r: { [x: string]: any; }, a: { groupUUID: string | number; }) => {
          r[a.groupUUID] = [...(r[a.groupUUID] || []), a]; return r; }, {});
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


  openDialog(uuid: string) {
    let dialogRef = this.dialog.open(FollowManageDialoComponent, {
      data: {uuid,submissionControl: this.data},
      height: '80vh'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result)
      }
    });
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
  fileControl = new FormControl(
    [],
    [FileValidators.maxFileCount(5)]
  )
  ngOnInit(): void {
    this.loadsubmissionControlStatus()
    this.loadAgency()
    console.log(this.data.uuid)
    console.log(this.data.submissionControl.id)
  }
  onUploadFile(file: any) {
    console.log(this.fileControl.value);

    // this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
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
        this._http
          .post(API_URL.submissionOrder, {
            id: '',
            groupUuid: this.data.uuid,
            submissionControlId: this.data.submissionControl.id,
            submissionOrderStatusId: '1',
            agencyId: '',
            userId: '',
            remark: this.remark,
          })
          .subscribe(
            (res) => {
              this.layout.hide()
            },
            (error) => {
              console.error(error);
            }
          );
      }
    });
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
}
