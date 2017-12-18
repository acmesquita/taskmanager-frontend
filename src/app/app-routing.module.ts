import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

const ROUTES = RouterModule.forRoot([
    { path: 'tasks/:id', component: TaskDetailComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'sign_up', component: SignUpFormComponent },
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