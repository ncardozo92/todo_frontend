import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

import { TodoService } from "./servicios/todo.service"
import { UsuarioService } from "./servicios/usuario.service";

import { TodoList } from "./types/TodoList";


@Component({

    selector : "listas",
    templateUrl : "./templates/panel-listas.component.html"
})

export class PanelListas implements OnInit{


    constructor( 
        private todoService : TodoService,
        private usuarioService : UsuarioService,
        private router : Router
    ){}

    private listas : TodoList[]

    private lista : TodoList = new TodoList()

    ngOnInit(){

        let idUsuario : number= this.usuarioService.getSessionId()

        this.lista.IdUsuario = idUsuario
                
        this.todoService.getAll(idUsuario).subscribe( response =>{

            this.listas = response
        })
    }

    public crear() : void{

        this.todoService.crearLista(this.lista).subscribe(response =>{

            this.ngOnInit()

            this.lista.Nombre = ""
            this.lista.Descripcion = ""

        },
        error =>{

            switch(error.status){

                case 400 : alert("El nombre es obligatorio y no puede tener más de 20 caracteres.")
                            break
                
                case 500 : alert("No se ha podido crear la lista, vuelva a intentarlo.")
                            break
                default : alert("Se ha producido un error desconocido.")
                            break
            }
        })
        
    }

    public removerEliminado( id : number ) : void{

        let index = this.listas.indexOf(this.listas.find(l => l.Id == id))

        this.listas.splice(index,1)
    }

    
}