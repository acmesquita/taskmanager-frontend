import { Injectable } from '@angular/core';

import { Task } from './task.model';

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

    public getTasks(): Promise<Task[]>{
        let promise = new Promise<Task[]>((resolve, reject)=>{
            if(TASKS.length > 0){
                resolve(TASKS);
            }else{
                let error_msg = "Não ha tarefas";
                reject(error_msg);
            }
        });

        return promise;
    }
}