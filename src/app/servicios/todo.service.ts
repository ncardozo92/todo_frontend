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
    
    private headers: HttpHeaders = new HttpHeaders({
        "Content-Type" : "application/json",
        "Authorization" : document.cookie.includes("SessionToken")?document.cookie.split(";").find( ( c ) => c.includes("SessionToken")).split("=").pop():"abc"
        //cadena vacia para que el servidor no genere error
    })
    
    public getAll() : Observable<HttpResponse<ToDoListResponse[]>>{

        return this.http.post<ToDoListResponse[]>(
            `${this.apiUrl}GetListas`,
            null,
            {observe : "response", headers : this.headers}
         )
    }

    public getLista(id:number) : Observable<HttpResponse<ToDoListResponse>>{

        return this.http.get<ToDoListResponse>(`${this.apiUrl}GetLista/${id}`,{observe : "response", headers : this.headers})
    }

    public crearLista(lista : TodoList ) : Observable<HttpResponse<void>>{

        return this.http.post<void>(`${this.apiUrl}Crear`, lista, {observe : "response",headers : this.headers})
    }

    public eliminarLista (id : number) : Observable<HttpResponse<void>>{

        return this.http.get<void>(`${this.apiUrl}eliminar/${id}`,{observe : "response", headers : this.headers})
    }

    public modificarLista(lista : TodoList) {

        return this.http.post(`${this.apiUrl}ModificarLista`,lista,{observe : "response", responseType : "text", headers : this.headers})
    }

    //tareas

    public getTareas( id : number) : Observable<HttpResponse<TareaResponse[]>>{

        return this.http.get<TareaResponse[]>(`${this.apiUrl}getTareas/${id}`,{observe : "response", headers : this.headers})
    }

    public agregarTarea(tarea : Tarea) : Observable<HttpResponse<void>>{

        return this.http.post<void>(`${ this.apiUrl }AgregarTarea`,tarea,{observe : "response", headers : this.headers})
    }

    public cambiarEstado(id : Number) : Observable<HttpResponse<void>>{

        return this.http.get<void>(`${this.apiUrl}actualizarTarea/${id}`,{observe : "response", headers : this.headers})
    }

    public eliminarTarea(id : Number) : Observable<HttpResponse<void>>{

        return this.http.get<void>(`${this.apiUrl}EliminarTarea/${id}`,{observe : "response", headers : this.headers})
    }
}