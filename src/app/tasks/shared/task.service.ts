import { Http } from "@angular/http";
import { Injectable } from '@angular/core';

import { Task } from './task.model';
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import { Response } from "@angular/http/src/static_response";


@Injectable()
export class TaskService{

    public taskUrl = "api/tasks";

    public constructor(
        private http: Http
    ){}

    public getTasks(): Observable<Task[]>{
        return this.http.get(this.taskUrl).map( (response: Response) => response.json() as Task[]);
    }

    public getImportanteTasks(): Observable<Task[]>{
        return this.getTasks().map(tasks => tasks.slice(0,4));
    }

    public getTask(id: number): Observable<Task>{
        let url = `${this.taskUrl}/${id}`
        return this.http.get(url).map( (response: Response) => response.json() as Task);
    }

}