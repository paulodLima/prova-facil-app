import {documentoRoutes} from "./documento.routes";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(documentoRoutes),
  ],
  providers: [
  ]
})
export class DocumentoModule { }
