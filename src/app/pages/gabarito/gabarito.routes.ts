import {Routes} from "@angular/router";

export const gabaritoRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./gabarito-form/gabarito-form.component').then((m) => m.GabaritoFormComponent)
  },
];
