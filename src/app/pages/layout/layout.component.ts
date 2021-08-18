import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
declare var document: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isSearchActive: boolean = false;
  isSlideMenu: boolean = false;
  
  visibleSidebar1: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
