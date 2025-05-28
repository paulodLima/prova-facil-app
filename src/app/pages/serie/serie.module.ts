import {serieRoutes} from "./serie.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(serieRoutes),
  ],
  providers: [
  ]
})
export class SerieModule { }
