import { Response } from "@angular/http";
import { Injectable } from '@angular/core';

import { Task } from './task.model';
import { Observable } from "rxjs/Observable";

import { TokenService } from '../../shared/token.service';

@Injectable()
export class TaskService{
    
    public taskUrl = "tasks";

    public constructor(
        private tokenService: TokenService
    ){}
    
    public getAll(): Observable<Task[]>{

        let url = `${this.taskUrl}?q[s]=update_at+DESC`;

        return this.tokenService.get(url)
        .catch(this.hendleErrors)
        .map( (response: Response) => this.responseToTasks(response));
    }
    
    public getImportant(): Observable<Task[]>{

        let url = `${this.taskUrl}?q[s]=deadline+ASC`;
         
        return this.tokenService.get(url)
        .catch(this.hendleErrors)
        .map( (response: Response) => this.responseToTasks(response));
    }
    
    public getById(id: number): Observable<Task>{
        let url = `${this.taskUrl}/${id}`
        return this.tokenService.get(url)
        .catch(this.hendleErrors)
        .map( (response: Response) => this.responseToTask(response));
    }

    public create(task: Task): Observable<Task>{
        let url = this.taskUrl;
        let body = JSON.stringify(task);
        
        return this.tokenService.post(url, body)
            .catch(this.hendleErrors)  
            .map((response: Response)=> this.responseToTask(response));
    }
    
    public update(task: Task): Observable<Task>{
        let url = `${this.taskUrl}/${task.id}`;
        let body = JSON.stringify(task);

        return this.tokenService.put(url, body)
            .catch(this.hendleErrors)
            .map(()=>task);
    }

    public delete(id: number): Observable<null>{
        let url = `${this.taskUrl}/${id}`;

        return this.tokenService.delete(url)
            .catch(this.hendleErrors)
            .map(()=>null)

    }

    public searchByTitle(title: String): Observable<Task[]>{
        let url = `${this.taskUrl}?q[title_cont]=${title}`

        return this.tokenService.get(url)
                .catch(this.hendleErrors)
                .map((response: Response) => this.responseToTasks(response));
    }

    private hendleErrors(error: Response) {
        console.log("Salvando em algum lugar o erro", error);
        return Observable.throw(error);
    }

    private responseToTasks(response: Response){

        let collection = response.json().data as Array<any>;
        let tasks :Task[] = [];

        collection.forEach(item=>{
            let task = new Task(
                item.id,
                item.attributes.title,
                item.attributes.description,
                item.attributes.done,
                item.attributes['deadline-to-br'],                    
            )

            tasks.push(task);
        })

        return tasks;
    }

    private responseToTask(response : Response){
        let item = response.json().data;
        return new Task(item.id, 
                        item.attributes.title,
                        item.attributes.description,
                        item.attributes.done,
                        item.attributes['deadline-to-br'])
}
}