import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"
import { TodoService} from "./servicios/todo.service"

import { TodoList } from "./types/TodoList";

@Component({

    selector : "lista",
    templateUrl : "./templates/lista-item.component.html" 
})

export class ListaItemComponent implements OnInit{

    @Input() item : TodoList

    @Output() onDelete = new EventEmitter<number>()

    private estadoActual : TodoList

    private visible :boolean = true 

    private alertModificacion :boolean = false 

    constructor( private todoService: TodoService){
    }

    ngOnInit() {

        this.estadoActual = Object.assign({},this.item)
    }

    public eliminar() : void {

        this.todoService.eliminarLista(this.item.Id).subscribe( response =>{

            this.onDelete.emit(this.item.Id)
        },
        error => {

            alert("Ha ocurrido un problema, por favor inténtelo más tarde.")
        })
    }

    public modificar() : void{

        this.todoService.modificarLista(this.item).subscribe( response =>{

            this.visible = true
        },
        error =>{

                this.alertModificacion = true

                this.item = this.estadoActual
            })
    }
}