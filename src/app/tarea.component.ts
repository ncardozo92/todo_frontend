import { Component, Input, Output, EventEmitter } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
    
import { TodoService } from "./servicios/todo.service"
    
import { Tarea } from "./types/Tarea"
    
@Component({
    
    selector : "tarea",
    template : `<div class="row justify-content-between">
                    <div class="col-10">
                        <input type="checkbox" class="form-checkbox-input" [checked]="item.Hecho" (click)="cambiarEstado()"/>
                        <span class="form-checkbox-text">{{ item.Descripcion }}</span>
                    </div>
                    <div class="col-2">
                        <span class="badge badge-danger" (click)="eliminarTarea()">&times;</span>
                    </div>
                </div>`
})

export class TareaComponent{
    
    @Input() item : Tarea

    @Output() onDelete = new EventEmitter<number>()
    
    constructor(private todoService : TodoService, private http :HttpClient){}
    
    public cambiarEstado() : void{
        
        this.todoService.cambiarEstado(this.item.Id).subscribe( response =>{

                //estado cambiado
        },
        error =>{

            alert(error.error)
            this.item.Hecho = false
        })
    }

    public eliminarTarea() :void{

        this.todoService.eliminarTarea(this.item.Id).subscribe(response =>{

            this.onDelete.emit(this.item.Id)
        },
        error => {

            alert(error.error)
        })
    }
}
