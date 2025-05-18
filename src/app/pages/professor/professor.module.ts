import {professorRoutes} from "./professor.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(professorRoutes),
  ],
  providers: [
  ]
})
export class ProfessorModule { }
