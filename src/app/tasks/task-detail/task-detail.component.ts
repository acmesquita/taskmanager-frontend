import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit{
    public reactiveTaskForm: FormGroup;
    public task: Task;
    public taskDoneOptions: Array<any> = [
        {value: false, text: "Pendente"},
        {value: true, text:"Realizada"}
    ]

    public constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder
    ){
        this.reactiveTaskForm = this.formBuilder.group({
            title: [null, [Validators.required,
                           Validators.maxLength(255), 
                           Validators.minLength(2)]],
            deadline: [null, Validators.required],
            done: [null, Validators.required],
            description: [null]
        })
     }

    public ngOnInit(){
        this.task = new Task(null, "");
        this.route.params
        .switchMap((params: Params)=>this.taskService.getById(+params['id']))
        .subscribe(task => this.setTask(task), error => alert("Ocorreu um erro no servidor."))
        
    }

    public ngAfterContentInit() {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
        $("#deadline").datetimepicker(
            {
                'sideBySide':true,
                'locale':'pt-br'
            }
        ).on('dp.change', ()=> this.reactiveTaskForm.get('deadline').setValue($("#deadline").val().toString()));
    }

    public goBack(){
        this.location.back();
    }

    public updateTask(){
        this.task.title = this.reactiveTaskForm.get('title').value;
        this.task.deadline = this.reactiveTaskForm.get('deadline').value;
        this.task.done = this.reactiveTaskForm.get('done').value;
        this.task.description = this.reactiveTaskForm.get('description').value;

        this.taskService.update(this.task)
            .subscribe(
                ()=>alert("Deu certo"),
                () => alert("Deu erro")
            )
    }

    public showFieldError(field): boolean{
        return field.invalid && (field.touched || field.dirty)
    }

    setTask(task: Task): void {
        this.task = task;

        // //set Value
        // let formModel = {
        //     title: task.title || null,
        //     deadline: task.deadline || null,
        //     done: task.done || null,
        //     description: task.description || null,            
        // }
        // this.reactiveTaskForm.setValue(formModel);

        //patch Value

        this.reactiveTaskForm.patchValue(task);

    }

}