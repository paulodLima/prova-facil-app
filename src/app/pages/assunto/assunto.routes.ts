import {Routes} from "@angular/router";

export const assuntoRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./assunto-list/assunto-list.component').then((m) => m.AssuntoListComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./assunto-form/assunto-form.component').then((m) => m.AssuntoFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./assunto-form/assunto-form.component').then((m) => m.AssuntoFormComponent)
  }
];
