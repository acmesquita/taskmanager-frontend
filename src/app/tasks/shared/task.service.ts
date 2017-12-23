import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';

import { Task } from './task.model';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TaskService{
    
    public taskUrl = "http://api.task-manager.dev:3000/tasks";
    public headers = new Headers({'Content-type': 'application/json'});
    
    public constructor(
        private http: Http
    ){}
    
    public getAll(): Observable<Task[]>{
        return this.http.get(this.taskUrl)
        .catch(this.hendleErrors)
        .map( (response: Response) => response.json() as Task[]);
    }
    
    public getImportant(): Observable<Task[]>{
        return this.getAll()
        .map(tasks => tasks.slice(0,4));
    }
    
    public getById(id: number): Observable<Task>{
        let url = `${this.taskUrl}/${id}`
        return this.http.get(url)
        .catch(this.hendleErrors)
        .map( (response: Response) => response.json() as Task);
    }

    public create(task: Task): Observable<Task>{
        let url = this.taskUrl;
        let body = JSON.stringify(task);
        
        return this.http.post(url, body, {headers:this.headers})
            .catch(this.hendleErrors)  
            .map((respose: Response)=> respose.json() as Task)
    }
    
    public update(task: Task): Observable<Task>{
        let url = `${this.taskUrl}/${task.id}`;
        let body = JSON.stringify(task);

        return this.http.put(url, body, {headers: this.headers})
            .catch(this.hendleErrors)
            .map(()=>task);
    }

    public delete(id: number): Observable<null>{
        let url = `${this.taskUrl}/${id}`;

        return this.http.delete(url, {headers:this.headers})
            .catch(this.hendleErrors)
            .map(()=>null)

    }

    public searchByTitle(title: String): Observable<Task[]>{
        let url = `${this.taskUrl}?title=${title}`

        return this.http.get(url)
                .catch(this.hendleErrors)
                .map((response: Response) => response.json() as Task[]);
    }

    private hendleErrors(error: Response) {
        console.log("Salvando em algum lugar o erro", error);
        return Observable.throw(error);
    }
}