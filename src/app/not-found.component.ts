import { Component } from "@angular/core"

@Component({
    
    selector : "not-found",
    template :`<div class="container">
                    <div class="row">
                        <div class="col-12">
                             El recurso solicitado no existe.
                        </div>
                    </div>
                </div>` 
})

export class NotFoundComponent{
    }
