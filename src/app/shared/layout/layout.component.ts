import { BreakpointObserver } from "@angular/cdk/layout";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef
} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from  "../service/auth.service"

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild("drawer", {static: true}) drawer: any;

  constructor(public observer: BreakpointObserver,public cd: ChangeDetectorRef,public auth:AuthService) {
  }

  ngOnInit(): void {
    this.drawer.mode = 'side';
    this.drawer.close();

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
  btn() {
    this.drawer.toggle()
  }

}
