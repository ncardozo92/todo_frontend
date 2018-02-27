import { Component, OnInit } from "@angular/core"

import { UsuarioService } from "./servicios/usuario.service"

import { Router, Event, NavigationStart } from "@angular/router"

@Component({

    selector : "logout",
    template : `<button class="btn btn-danger btn-sm" (click)="logout()" *ngIf="visible">Cerrar sesión</button>`
})

export class LogoutComponent{

    private visible : boolean 

    ngOnInit(){
        
        this.router.events.subscribe((event : Event) => {

            if (event instanceof NavigationStart ) {
              this.visible = (event.url != "/login" && event.url != "/registrarse" && event.url != "/")? true : false;
            }
          })
    }

    constructor( private usuarioService : UsuarioService, private router : Router ){}

    public logout() : void{

        this.usuarioService.logout()

        this.router.navigate(["/login"])
    }
}