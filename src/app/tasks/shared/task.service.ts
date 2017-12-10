import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';

import { Task } from './task.model';
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";


@Injectable()
export class TaskService{
    
    public taskUrl = "api/tasks";
    
    public constructor(
        private http: Http
    ){}
    
    public getTasks(): Observable<Task[]>{
        return this.http.get(this.taskUrl)
        .catch(this.hendleErrors)
        .map( (response: Response) => response.json() as Task[]);
    }
    
    public getImportanteTasks(): Observable<Task[]>{
        return this.getTasks()
        .map(tasks => tasks.slice(0,4));
    }
    
    public getTask(id: number): Observable<Task>{
        let url = `${this.taskUrl}/${id}`
        return this.http.get(url)
        .catch(this.hendleErrors)
        .map( (response: Response) => response.json() as Task);
    }
    
    public updateTask(task: Task): Observable<Task>{
        let url = `${this.taskUrl}/${task.id}`;
        let body = JSON.stringify(task);
        let headers = new Headers({'Content-type': 'application/json'});

        return this.http.put(url, body, {headers: headers})
            .catch(this.hendleErrors)
            .map(()=>task);
    }

    private hendleErrors(error: Response) {
        console.log("Salvando em algum lugar o erro", error);
        return Observable.throw(error);
    }
}