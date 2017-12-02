import { Component, OnInit } from '@angular/core'

import { TaskService } from '../tasks/shared/task.service';
import { Task } from '../tasks/shared/task.model';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    
    public tasks: Array<Task>

    public constructor(private taskService: TaskService){
       
    }

    public ngOnInit(){
        this.taskService.getImportanteTasks().then((tasks)=> this.tasks = tasks)
    }

}