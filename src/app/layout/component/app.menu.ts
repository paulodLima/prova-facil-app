import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                  {
                    label: 'Inicio',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/']
                  },
                    {
                        label: 'Perguntas',
                        icon: 'bi bi-file-earmark-medical',
                        items: [
                            {
                                label: 'Consultar Documentos',
                                icon: 'bi bi-search',
                                routerLink: ['/consultar-documentos']
                            },
                            {
                                label: 'Criar Documentos',
                                icon: 'bi bi-clipboard-plus',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Cancelar Documentos',
                                icon: 'bi bi-x-octagon',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Rentabilidade',
                        icon: 'bi bi-cash-coin',
                      items: [
                        {
                          label: 'Login',
                          icon: 'bi bi-calculator',
                          routerLink: ['/auth/login']
                        },
                        {
                          label: 'Tramite da Rentabilidade',
                          icon: 'bi bi-wallet2',
                          items: [
                            {
                              label: 'Rentabilidade Calculada',
                              icon: 'bi bi-database-check',
                              routerLink: ['/auth/login']
                            },
                            {
                              label: 'Consulta Saldo',
                              icon: 'bi bi-search',
                              routerLink: ['/auth/error']
                            }
                          ]
                        },
                        {
                          label: 'Tabelas de Apoio',
                          icon: 'bi bi-info-square',
                          routerLink: ['/auth/access']
                        }
                      ]
                    },
                    {
                        label: 'Gestão de Banco',
                        icon: 'bi bi-bank',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Gestão de Rentabilidade',
                        icon: 'bi bi-cash-stack',
                        routerLink: ['/pages/empty']
                    }
                ]
            }
        ];
    }
}
