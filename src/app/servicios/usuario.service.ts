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

    private sessionCookieName = "SessionToken"

    
    public login( usuarioSolicitante : Usuario ) : Observable<HttpResponse<string>> {
        
        return this.http.post<string>(`${this.apiUrl}Login`,usuarioSolicitante, {observe : "response"})
    }

    public setSessionCookie(jwtToken){
                
        let fechaExpiracion = new Date()

        let tiempoExpriracion = fechaExpiracion.getHours()

        tiempoExpriracion += 8 //seteo la hora de caducidad de la cookie en 8 horas

        fechaExpiracion.setHours(tiempoExpriracion)
        
        document.cookie = this.sessionCookieName + "=" + jwtToken + ";expires=" + fechaExpiracion + ";" 
    }

    public logout(){

        document.cookie = this.sessionCookieName + "=0;expires=Thu, 01 Jan 1970 00:00:01 GMT"
    }
    
    public verificarJwtCookie() : void{

        let cookies = document.cookie.split(';')

        if( cookies.find( (c)=> c.includes(this.sessionCookieName)) == null)
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