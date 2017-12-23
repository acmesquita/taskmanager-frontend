import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FormUtils } from '../../shared/form.utils'
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styles:[".form-control-feedback{margin-right: 20px;}"]
})

export class TaskDetailComponent implements OnInit{
    public form: FormGroup;
    public task: Task;
    public taskDoneOptions: Array<any>;
    public formUtils: FormUtils

    public constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder
    ){
        this.taskDoneOptions = [
            {value: false, text: "Pendente"},
            {value: true, text:"Realizada"}
        ];

        this.form = this.formBuilder.group({
            title: [null, [Validators.required,
                           Validators.maxLength(255), 
                           Validators.minLength(2)]],
            deadline: [null, Validators.required],
            done: [null, Validators.required],
            description: [null]
        });

        this.formUtils = new FormUtils(this.form);
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
        ).on('dp.change', ()=> this.form.get('deadline').setValue($("#deadline").val().toString()));
    }

    public goBack(){
        this.location.back();
    }

    public updateTask(){
        this.task.title = this.form.get('title').value;
        this.task.deadline = this.form.get('deadline').value;
        this.task.done = this.form.get('done').value;
        this.task.description = this.form.get('description').value;

        this.taskService.update(this.task)
            .subscribe(
                ()=>alert("Deu certo"),
                () => alert("Deu erro")
            )
    }

    
    setTask(task: Task): void {
        this.task = task;
        this.form.patchValue(task);
    }

}