import {gabaritoRoutes} from "./gabarito.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(gabaritoRoutes),
  ],
  providers: [
  ]
})
export class GabaritoModule { }
