import {Routes} from "@angular/router";

export const serieRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./serie-list/serie-list.component').then((m) => m.SerieListComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./serie-form/serie-form.component').then((m) => m.SerieFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./serie-form/serie-form.component').then((m) => m.SerieFormComponent),
  }
];
