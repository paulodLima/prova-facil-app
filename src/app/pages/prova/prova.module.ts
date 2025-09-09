import {provaRoutes} from "./prova.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(provaRoutes),
  ],
  providers: [
  ]
})
export class ProvaModule { }
