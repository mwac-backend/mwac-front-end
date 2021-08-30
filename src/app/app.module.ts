import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// ============== OTHER ===============
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from 'ngx-toastr';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";

// ===== PRIME NG MODULE ======
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {DockModule} from 'primeng/dock';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';


// === MATERIAL MODULE======
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatDialogModule } from "@angular/material/dialog";

// ===== COMPONENT ======
import {LayoutComponent} from './shared/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './auth/login/login.component';
import {ChangePasswordComponent} from './auth/change-password/change-password.component';
import {PetitionComponent} from './pages/petition/petition.component';
import {InterceptorService} from './shared/service/interceptor.service';
import {FollowUpComponent} from './pages/follow-up/follow-up.component';
import {
  FollowManageDialoComponent,
  FollowUpManageComponent
} from './pages/follow-up/follow-up-manage/follow-up-manage.component'
import {DateFormatPipe} from './shared/pipe/date-format.pipe'
import {ToastModule} from 'primeng/toast';
import { CountDatePipe } from './shared/pipe/count-date.pipe';
// config
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    LoginComponent,
    ChangePasswordComponent,
    PetitionComponent,
    FollowUpComponent,
    FollowUpManageComponent,
    DateFormatPipe,
    CountDatePipe,
    FollowManageDialoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    SidebarModule,
    DockModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    PanelMenuModule,
    MenuModule,
    MatExpansionModule,
    MatListModule,
    BreadcrumbModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ToastModule,
    MatSelectModule,
    CalendarModule,
    FileUploadModule,
    NgxFileDragDropModule,
    PerfectScrollbarModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  exports: [
    DateFormatPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
    },
    MessageService,
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
      ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
