import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";

import { Usuario } from "../types/Usuario";
import {UsuarioResponse } from "../types/UsuarioResponse";

import { Location } from "@angular/common"
import { Router } from "@angular/router"
import { HttpClient, HttpResponse } from "@angular/common/http"


@Injectable()
export class UsuarioService{

    constructor( private location : Location, private router : Router, private http : HttpClient ){ }

    private apiUrl : string = "http://localhost:57872/api/Usuario/"

    
    public login( usuarioSolicitante : Usuario ) : Observable<HttpResponse<UsuarioResponse>> {
        
        return this.http.post<UsuarioResponse>(`${this.apiUrl}Login`,usuarioSolicitante, {observe : "response"})
    }

    logout(){

        document.cookie = "UserId=0;expires=Thu, 01 Jan 1970 00:00:01 GMT"
    }

    public getSessionId () : number{

        let cookies
        let cookie
        let splitedCookie

        if(document.cookie.length > 0){

            cookies = document.cookie.split(";")

            cookie = cookies.find( ( c ) => c.includes("UserId"))
        }
        

        if(cookie != null){

            splitedCookie = cookie.split("=")
            
            return parseInt(splitedCookie[1])
        }
        else
            this.router.navigate(["/login"])
            
    }

    public goBack() : void{

        this.location.back()
    }

    public registrar( usuario : Usuario) : Observable<HttpResponse<void>>{//IMPORTAR EL TIPO HttpResponse PARA LEER LA DATA DE LA RESPUESTA

        return this.http.post<void>(`${this.apiUrl}Registrar`,usuario,{ observe : "response" })
        //el tercer parametro see coloca para leer los headers de la respuesta
    }
}