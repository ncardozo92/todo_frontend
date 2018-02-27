import { Component } from "@angular/core"
import { Router } from "@angular/router"

import { UsuarioService } from "./servicios/usuario.service"

import { Usuario } from "./types/Usuario";

@Component({

    selector : "login",
    templateUrl : "./templates/login.component.html"
})

export class LoginComponent{

    constructor( private usuarioService : UsuarioService, private router : Router){}

    private usuario : Usuario = new Usuario()
    private notFoundAlert: boolean = false
    private emptyFieldsAlert : boolean = false

    public login() : void{

        if( this.usuario.Username == null || this.usuario.Clave == null){
            this.emptyFieldsAlert = true
        }
        else{

            this.usuarioService.login( this.usuario ).subscribe(response =>{

                document.cookie = "UserId=" + response.body.Id + ";expires=" + ( Date.now() + 28800) //se setea la cookie por 8 horas
                    
                this.router.navigate(["/listas"])
            },
            error =>{

                if( error.status == 404){

                    this.notFoundAlert = true
                }
            })
        }
        
    }
}