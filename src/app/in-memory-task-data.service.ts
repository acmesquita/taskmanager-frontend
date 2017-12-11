import { Injectable } from "@angular/core";

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from "./tasks/shared/task.model";

@Injectable()

export class InMemoryTaskDataService implements InMemoryDbService
{

    /**
     * createDb
     */
    public createDb() {
        let tasks = [            
            { id: 1, title:"Comprar uma carne para o almoço" },
            { id: 2, title:"Fazer lições de casa." },
            { id: 3, title:"Varrer o quintal" },
            { id: 4, title:"Visita ao hospital infantil" },
            { id: 5, title:"Comprar uma passagem para Recife." },
            { id: 6, title:"Entregar o dinheiro no comercio do Seu Ze" },
            { id: 7, title:"Fazer uma fachina no quarto" }  
        ];
        return {tasks};
    }
}