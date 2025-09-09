import {Routes} from "@angular/router";

export const provaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./prova-form/prova-form.component').then((m) => m.ProvaFormComponent)
  }
];
