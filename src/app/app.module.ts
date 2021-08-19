import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// ===== PRIME NG MODULE ======
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {DockModule} from 'primeng/dock';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {BreadcrumbModule} from 'primeng/breadcrumb';


// === MATERIAL MODULE======
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
// ===== COMPONENT ======
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { PetitionComponent } from './pages/petition/petition.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    LoginComponent,
    ChangePasswordComponent,
    PetitionComponent
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

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
