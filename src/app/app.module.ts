//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Angular in memory
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTaskDataService } from './in-memory-task-data.service';

//Modules
import { AppRoutingModule } from './app-routing.module'

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskSearchComponent } from './navbar/task-search/task-search.component';

//Services
import { TaskService } from './tasks/shared/task.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TasksComponent,
    TaskDetailComponent,
    TaskSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService)
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
