import { Injectable } from "@angular/core"

import { TodoList } from "../types/TodoList";
import { Tarea } from "../types/Tarea";
import { ToDoListResponse } from "../types/ToDoListResponse";
import { Usuario } from "../types/Usuario"
import { TareaResponse } from "../types/TareaResponse";

import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs/Observable";



@Injectable()

export class TodoService{

    constructor(private http : HttpClient){}

    private apiUrl : string = "http://localhost:57872/api/Listas/"
    
    public getAll(id :number ) : Observable<ToDoListResponse[]>{

        let usuario : Usuario = { Id : id, Username : "", Clave : "", Mail : "" }

        return this.http.post<ToDoListResponse[]>(`${this.apiUrl}GetListas`, usuario)
    }

    public getLista(id:number) : Observable<ToDoListResponse>{

        return this.http.get<ToDoListResponse>(`${this.apiUrl}GetLista/${id}`)
    }

    public crearLista(lista : TodoList ) : Observable<HttpResponse<void>>{

        return this.http.post<void>(`${this.apiUrl}Crear`, lista, {observe : "response"})
    }

    public eliminarLista (id : number) : Observable<HttpResponse<void>>{

        return this.http.get<void>(`${this.apiUrl}eliminar/${id}`,{observe : "response"})
    }

    public modificarLista(lista : TodoList) {

        let headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Accept': 'text'
        })

        return this.http.post(`${this.apiUrl}ModificarLista`,lista,{observe : "response", responseType : "text"})
    }

    //tareas

    public getTareas( id : number) : Observable<TareaResponse[]>{

        return this.http.get<TareaResponse[]>(`${this.apiUrl}getTareas/${id}`)
    }

    public agregarTarea(tarea : Tarea) : Observable<HttpResponse<void>>{

        return this.http.post<void>(`${ this.apiUrl }AgregarTarea`,tarea,{observe : "response"})
    }

    public cambiarEstado(id : Number) : Observable<HttpResponse<void>>{

        return this.http.get<void>(`${this.apiUrl}actualizarTarea/${id}`,{observe : "response"})
    }

    public eliminarTarea(id : Number) : Observable<HttpResponse<void>>{

        return this.http.get<void>(`${this.apiUrl}EliminarTarea/${id}`,{observe : "response"})
    }
}