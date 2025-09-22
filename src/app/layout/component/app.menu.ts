import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {AppMenuitem} from './app.menuitem';
import {LoginService} from '../../pages/auth/service/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index">
        <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
        <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>
    </ul> `
})
export class AppMenu {
  model: MenuItem[] = [];
  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    const roles = this.loginService.getRoles();
    const idEscola = localStorage.getItem('user_id');
    this.model = [
      {
        label: 'Menu',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/pages'],
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/inicio']
          },
          {
            label: 'Perguntas',
            icon: 'bi bi-file-earmark-medical',
            items: [
              {
                label: 'Consultar perguntas',
                icon: 'bi bi-search',
                routerLink: ['/inicio/perguntas']
              },
              {
                label: 'Cadastrar Pergunta',
                icon: 'bi bi-clipboard-plus',
                routerLink: ['/inicio/perguntas/novo']
              }
            ],
            visible: ['ADMIN','USER'].some(r => roles.includes(r))
          },
          {
            label: 'Série',
            icon: 'bi bi-mortarboard',
            routerLink: ['/inicio/serie'],
            visible: ['ADMIN','USER'].some(r => roles.includes(r))
          },
          {
            label: 'Assunto',
            icon: 'bi bi-book',
            routerLink: ['/inicio/assunto'],
            visible: ['ADMIN','USER'].some(r => roles.includes(r))
          },
          {
            label: 'Gerar Prova',
            icon: 'bi bi-journal-text',
            routerLink: ['/inicio/prova'],
            visible: ['ADMIN','USER'].some(r => roles.includes(r))
          },
          {
            label: 'Escola',
            icon: 'bi bi-building',
            routerLink: [`/inicio/escola/${idEscola}`],
            visible: ['ADMIN','ESCOLA'].some(r => roles.includes(r))
          },
          {
            label: 'Professor',
            icon: 'bi bi-person',
            routerLink: ['/inicio/escola'],
            visible: ['ADMIN','ESCOLA'].some(r => roles.includes(r))
          },
         /* {
            label: 'Ler Gabarito',
            icon: 'bi bi-clipboard-check',
            routerLink: ['/inicio/gabarito']
          }*/
        ]
      }
    ];
  }
}
