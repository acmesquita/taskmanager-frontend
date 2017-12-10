import { Http } from "@angular/http";
import { Injectable } from '@angular/core';

import { Task } from './task.model';
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import { Response } from "@angular/http/src/static_response";

const TASKS: Array<Task> = [
    { id: 1, title:"Fazer Tarefa 1" },
    { id: 2, title:"Fazer Tarefa 2" },
    { id: 3, title:"Fazer Tarefa 3" },
    { id: 4, title:"Fazer Tarefa 4" },
    { id: 5, title:"Fazer Tarefa 5" },
    { id: 6, title:"Fazer Tarefa 6" },
    { id: 7, title:"Fazer Tarefa 7" }
];

@Injectable()
export class TaskService{

    public taskUrl = "api/tasks";

    public constructor(
        private http: Http
    ){}

    public getTasks(): Observable<Task[]>{
        return this.http.get(this.taskUrl).map( (response: Response) => response.json().data as Task[]);
    }

    public getImportanteTasks(): Promise<Task[]>{
        return Promise.resolve(TASKS.slice(0, 3));
    }

    public getTask(id: number): Observable<Task>{
        let url = `${this.taskUrl}/${id}`
        return this.http.get(url).map( (response: Response) => response.json().data as Task);
    }

}