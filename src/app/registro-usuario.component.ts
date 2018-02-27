import { Component } from "@angular/core"

import { UsuarioService } from "./servicios/usuario.service"
import { Router } from "@angular/router"
import { HttpResponse } from "@angular/common/http"

import { Usuario } from "./types/Usuario"
@Component({
    
    selector : "registro-usuario",
    templateUrl : "./templates/registro-usuario.component.html"
   })
   
export class RegistroUsuarioComponent{

    private usuario : Usuario = new Usuario()

    private usuarioExistenteAlert : boolean = false
    private errorAlert : string
    
    constructor( private usuarioService : UsuarioService, private router : Router ){ }

    public registrar( ) : void{

        this.usuarioService.registrar(this.usuario).subscribe(response =>{

            this.router.navigate(["/login"])
        },
        error =>{

            this.errorAlert = error.error
    })
            
    }

}
