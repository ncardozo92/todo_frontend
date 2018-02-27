import { Component, OnInit } from "@angular/core"

import { UsuarioService } from "./servicios/usuario.service"
import { TodoService } from "./servicios/todo.service"

import {ActivatedRoute, Router } from "@angular/router"

import { Tarea } from "./types/Tarea";
import { TodoList } from "./types/TodoList";


@Component({
    
    selector : "lista-tareas",
    templateUrl : "./templates/lista-tareas.component.html"
   })
   
export class ListaTareasComponent{

    private tareas : Tarea[]

    private tarea =  new Tarea()

    private lista = new TodoList()
    
    constructor(
        private todoService : TodoService,
        private usuarioService : UsuarioService,
        private router : Router,
        private activatedRoute : ActivatedRoute ){
        }

        private getTareas(id :number){

            this.todoService.getTareas(id).subscribe( response => {

                this.tareas = response
            })
        }

    ngOnInit(){

        let id : number = Number(this.activatedRoute.snapshot.paramMap.get("id"))

        this.tarea.IdTodo = id

        this.todoService.getLista(id).subscribe( response =>{

            this.lista = response
        })
        
        this.getTareas(id)
    }

   public goBack() : void{

        this.usuarioService.goBack()
    }
    
    public agregarTarea() : void{

        this.todoService.agregarTarea( this.tarea).subscribe(response =>{

            this.ngOnInit()
        },
        error =>{

            alert(error.error)
        })
    }

    public removerTareaEliminada( id : number) : void{

        let indice = this.tareas.indexOf(this.tareas.find( t => t.Id == id))

        this.tareas.splice(indice,1)
    }

}
