import { Injectable } from "@angular/core";

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()

export class InMemoryTaskDataService implements InMemoryDbService
{

    /**
     * createDb
     */
    public createDb() {
        let tasks = [            
            { id: 1, title:"Fazer Tarefa 1" },
            { id: 2, title:"Fazer Tarefa 2" },
            { id: 3, title:"Fazer Tarefa 3" },
            { id: 4, title:"Fazer Tarefa 4" },
            { id: 5, title:"Fazer Tarefa 5" },
            { id: 6, title:"Fazer Tarefa 6" },
            { id: 7, title:"Fazer Tarefa 7" }  
        ];
        return tasks;
    }
}