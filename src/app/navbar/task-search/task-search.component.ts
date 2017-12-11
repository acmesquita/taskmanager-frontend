import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Task } from "../../tasks/shared/task.model";
import { TaskService } from "../../tasks/shared/task.service";

import { Subject } from "rxjs/Subject";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";


@Component({
    selector: 'task-search',
    templateUrl: './task-search.component.html'
})

export class TaskSearchComponent implements OnInit{

    public searchTerms: Subject<string> = new Subject();
    public tasks: Task[] = [];

    public constructor (private taskService: TaskService, private router: Router){
        
    }

    public search(term: string){
        console.log(term);
        this.searchTerms.next(term);
    }

    public ngOnInit(){
        this.searchTerms
            .switchMap(term=>term?this.taskService.searchByTitle(term):Observable.of<Task[]>([]))
            .subscribe(tasks => this.tasks= tasks)       
    }

    public goToTask(task: Task){
        this.tasks = [];
        this.router.navigate(['/tasks', task.id]);
    }
}
