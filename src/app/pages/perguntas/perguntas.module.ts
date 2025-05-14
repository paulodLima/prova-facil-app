import {perguntasRoutes} from "./perguntas.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(perguntasRoutes),
  ],
  providers: [
  ]
})
export class PerguntasModule { }
