import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PetitionComponent} from './pages/petition/petition.component';
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./shared/guard/auth.guard"
import {FollowUpComponent} from "./pages/follow-up/follow-up.component"
import {FollowUpManageComponent} from "./pages/follow-up/follow-up-manage/follow-up-manage.component"

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        pathMatch: "full",
      },
      {
        path: "petition",
        component: PetitionComponent
      }, {
        path: "follow-up",
        component: FollowUpComponent
      }, {
        path: "follow-up-manage",
        component: FollowUpManageComponent
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
