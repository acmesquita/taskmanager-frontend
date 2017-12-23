import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

import { AuthGuard } from "./guard/auth.guard";

const ROUTES = RouterModule.forRoot([
    { path: 'sign_in', component: SignInFormComponent },
    { path: 'sign_up', component: SignUpFormComponent },
    { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ])
  

@NgModule({
    declarations: [],
    imports: [
        ROUTES 
    ],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule {}