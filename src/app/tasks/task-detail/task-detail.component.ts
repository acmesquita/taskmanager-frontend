import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit{
    public task: Task;
    public taskDoneOptions: Array<any> = [
        {value: false, text: "Pendente"},
        {value: true, text:"Realizada"}
    ]

    public constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private location: Location
    ){ }

    public ngOnInit(){
        this.task = new Task(null, "");
        this.route.params
        .switchMap((params: Params)=>this.taskService.getById(+params['id']))
        .subscribe(task => this.task = task, error => alert("Ocorreu um erro no servidor."))
        
    }

    public ngAfterContentInit() {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
        $("#deadline").datetimepicker(
            {
                'sideBySide':true,
                'locale':'pt-br'
            }
        ).on('dp.change', ()=> this.task.deadline = $("#deadline").val().toString());
    }

    public goBack(){
        this.location.back();
    }

    public updateTask(){
        if(!this.task.title){
            alert("A tarefa deve ter um título.")
        }else{
            this.taskService.update(this.task)
                .subscribe(
                    ()=>alert("Deu certo"),
                    () => alert("Deu erro")
                )
        }
    }

    public showFieldError(field): boolean{
        return field.invalid && (field.touched || field.dirty)
    }

}