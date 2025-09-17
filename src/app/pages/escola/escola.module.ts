import {escolaRoutes} from "./escola.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(escolaRoutes),
  ],
  providers: [
  ]
})
export class EscolaModule { }
