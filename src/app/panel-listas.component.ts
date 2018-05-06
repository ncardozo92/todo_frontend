import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

import { TodoService } from "./servicios/todo.service"
import { UsuarioService } from "./servicios/usuario.service";

import { TodoList } from "./types/TodoList";


@Component({

    selector : "listas",
    templateUrl : "./templates/panel-listas.component.html",
    styles : ["ul.list-group{ margin-top : 10px;}"]
})

export class PanelListas implements OnInit{

    
    private listasTareas : TodoList[] = []

    private lista : TodoList = new TodoList()

    constructor( 
        private todoService : TodoService,
        private usuarioService : UsuarioService,
        private router : Router
    ){}

    ngOnInit(){

        this.usuarioService.verificarJwtCookie()
               
        this.todoService.getAll().subscribe( response =>{

            this.listasTareas = response.body as TodoList[]
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

        let index = this.listasTareas.indexOf(this.listasTareas.find(l => l.Id == id))

        this.listasTareas.splice(index,1)
    }

    
}
