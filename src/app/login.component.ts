import { Component } from "@angular/core"
import { Router } from "@angular/router"

import { UsuarioService } from "./servicios/usuario.service"

import { Usuario } from "./types/Usuario";

@Component({

    selector : "login",
    templateUrl : "./templates/login.component.html",
    styles : ["section{ margin-top : 55px!important;}"]
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

                this.usuarioService.setSessionCookie(response.body)
                    
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