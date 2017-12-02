import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    providers:[ TaskService ]
})

export class TasksComponent implements OnInit{
    
    public tasks: Array<Task> ;
    public selectedTask: Task;

    public constructor(private taskService: TaskService){}

    public ngOnInit(): void {
      this.taskService.getTasks()
        .then((tasks) => this.tasks = tasks)
        .catch((erro_msg) => alert(erro_msg))
    }

    public onSelect(task: Task): void{
        this.selectedTask = task;
    }

}