import {Routes} from "@angular/router";

export const perguntasRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./perguntas-list/perguntas-list.component').then((m) => m.PerguntasListComponent)
  },
  {
    path: 'novo',
    loadComponent: () => import('./perguntas-form/perguntas-form.component').then((m) => m.PerguntasFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./perguntas-form/perguntas-form.component').then((m) => m.PerguntasFormComponent)
  }
];
