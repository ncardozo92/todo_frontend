import { Component } from "@angular/core"

import {Usuario} from "./types/Usuario"

import { UsuarioService } from "./servicios/usuario.service"

import {Router} from "@angular/router"


@Component({
    
    selector : "registro-usuario",
    //templateUrl : pendiente
   })
   
export class RegistroUsuarioComponent{
    
    private usuario : Usuario
    
    constructor(
        usuarioService : UsuarioService,
        router : Router //
    ){
        }
        
    public registrar() : void{
        
        console.log("se ha registrado")
    }   
}
