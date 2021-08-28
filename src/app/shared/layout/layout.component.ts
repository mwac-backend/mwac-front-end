import {BreakpointObserver} from "@angular/cdk/layout";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  Injectable
} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service"
import {NgxSpinnerService} from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild("drawer", {static: true}) drawer: any;

  constructor(public observer: BreakpointObserver,
    public cd: ChangeDetectorRef,
    public auth: AuthService,
     public router: Router,
     public spinner: NgxSpinnerService,
     private toastr: ToastrService,
     private messageService: MessageService, ) {
  }


  ngOnInit(): void {
    this.drawer.mode = 'side';
    this.drawer.close();
    let a = this.router.isActive('/dashboard', true)
    console.log(a)
  }


  showMessageNoti(data : any){
    this.messageService.add({key: data.key, severity:data.severity, summary: data.summary, detail: data.detail});
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    });
    this.cd.detectChanges();
  }

  show() {
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
