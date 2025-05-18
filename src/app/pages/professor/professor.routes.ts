import {Routes} from "@angular/router";

export const professorRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./professor-form/professor-form.component').then((m) => m.ProfessorFormComponent)
  }
];
