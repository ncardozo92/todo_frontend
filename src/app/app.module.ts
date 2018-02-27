import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { HttpClientModule} from "@angular/common/http"

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { PanelListas } from './panel-listas.component';
import { ListaTareasComponent } from "./lista-tareas.component"
import { RegistroUsuarioComponent } from "./registro-usuario.component"
import { LogoutComponent } from "./logout.component"
import { NotFoundComponent } from './not-found.component';
import { ListaItemComponent } from "./lista-item.component"
import { TareaComponent } from "./tarea.component"

import { TodoService } from "./servicios/todo.service"
import { UsuarioService } from "./servicios/usuario.service"


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelListas,
    ListaTareasComponent,
    NotFoundComponent,
    RegistroUsuarioComponent,
    LogoutComponent,
    ListaItemComponent,
    TareaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path : "login",
        component : LoginComponent
      },
      {
        path : "listas",
        component : PanelListas
      },
      {
        path : "lista/:id",
        component : ListaTareasComponent
      },
      {
        path : "registrarse",
        component : RegistroUsuarioComponent
      },
      {
        path : "",
        redirectTo : "/login",
        pathMatch : "full"
      },
      {
        path : "**",
        component : NotFoundComponent
      }
    ])
  ],
  providers: [
    TodoService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
