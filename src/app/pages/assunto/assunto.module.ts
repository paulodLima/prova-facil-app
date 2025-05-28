import {assuntoRoutes} from "./assunto.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(assuntoRoutes),
  ],
  providers: [
  ]
})
export class AssuntoModule { }
