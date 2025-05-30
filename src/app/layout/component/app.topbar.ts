import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import {Tooltip, TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {Image} from 'primeng/image';
import {LoginService} from '../../pages/auth/service/login.service';
import {Button} from 'primeng/button';

@Component({
    selector: 'app-topbar',
    standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, DropdownModule, Tooltip, Button],
    template: `
      <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
          <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
            <i class="pi pi-bars"></i>
          </button>
          <a class="layout-topbar-logo" routerLink="/">
            <svg width="60px" height="60px" viewBox="0 0 1024 1024" class="icon" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M74 183.7h216V918H74z" fill="#55B7A8"/>
              <path d="M298 926H66V175.7h232V926zM82 910h200V191.7H82V910z" fill="#0A0408"/>
              <path d="M125.6 246.6h116.8v229.2H125.6z" fill="#FFFFFF"/>
              <path d="M250.4 483.8H117.6V238.6h132.8v245.2z m-116.8-16h100.8V254.6H133.6v213.2z" fill="#0A0408"/>
              <path d="M178.8 783.9m-55.2 0a55.2 55.2 0 1 0 110.4 0 55.2 55.2 0 1 0-110.4 0Z" fill="#FFFFFF"/>
              <path
                d="M178.8 847.1c-34.8 0-63.2-28.3-63.2-63.2s28.3-63.2 63.2-63.2c34.8 0 63.2 28.3 63.2 63.2s-28.4 63.2-63.2 63.2z m0-110.4c-26 0-47.2 21.2-47.2 47.2s21.2 47.2 47.2 47.2 47.2-21.2 47.2-47.2-21.2-47.2-47.2-47.2z"
                fill="#0A0408"/>
              <path d="M519.4 224.2L728 168.3l190.1 709.3-208.6 55.9" fill="#FFFFFF"/>
              <path
                d="M517.346 216.397l7.727-2.07 4.14 15.454-7.727 2.07zM544.1 225.8l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-7.9l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-8l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-8l-4.1-15.5 14.9-4 4.1 15.5-14.9 4zM663 194l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-8l-4.1-15.5 14.9-4 4.1 15.5-14.9 4zM722.4 178.1l-4.2-15.5 15.5-4.1 4.1 15.4zM904.2 856.5l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.9l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.2-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.2-30.9l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.8l-4.1-15.4L866 652l4.1 15.4-15.5 4.1z m-8.3-30.9l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.2-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.9l-4.1-15.4 15.5-4.1L837 544l-15.5 4.1z m-8.2-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.9l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.2-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.9l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.2-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.9l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.2-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.9l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1z m-8.3-30.8l-4.1-15.4 15.5-4.1 4.1 15.4-15.5 4.1zM908.303 871.94l15.454-4.142 4.143 15.455-15.455 4.142zM734.2 935.1l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-7.9l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-8l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-7.9l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-8l-4.1-15.5 14.9-4 4.1 15.5-14.9 4z m29.7-8l-4.1-15.5 14.9-4 4.1 15.5-14.9 4zM707.443 925.66l7.727-2.07 4.141 15.454-7.727 2.07z"
                fill="#0A0408"/>
              <path d="M583.619 272.12l112.817-30.229 59.317 221.385-112.817 30.228z" fill="#FFFFFF"/>
              <path
                d="M637.3 503.3l-63.5-236.8L702.1 232l63.5 236.8-128.3 34.5z m-43.9-225.6l55.2 205.9 97.4-26.1-55.2-205.9-97.4 26.1z"
                fill="#0A0408"/>
              <path d="M722.664239 791.097256a55.2 55.2 0 1 0 106.63871-28.571762 55.2 55.2 0 1 0-106.63871 28.571762Z"
                    fill="#FFFFFF"/>
              <path
                d="M776 840c-27.9 0-53.5-18.6-61-46.8-9-33.7 11-68.4 44.7-77.4s68.4 11 77.4 44.7c9 33.6-11 68.4-44.7 77.4-5.5 1.4-11 2.1-16.4 2.1z m0-110.4c-4 0-8.1 0.5-12.2 1.6-25.1 6.7-40.1 32.7-33.4 57.8 6.7 25.1 32.7 40.1 57.8 33.4 25.1-6.7 40.1-32.7 33.4-57.8-5.7-21-24.8-35-45.6-35z"
                fill="#0A0408"/>
              <path d="M888.182 860.34l47.04-12.603 12.603 47.04-47.04 12.603z" fill="#DC444A"/>
              <path
                d="M895.2 917.2l-16.8-62.5 62.5-16.8 16.8 62.5-62.5 16.8zM898 866l8.5 31.6 31.6-8.5-8.5-31.6L898 866z"
                fill="#0A0408"/>
              <path d="M698.202 151.04l47.04-12.604 12.603 47.04-47.04 12.603z" fill="#DC444A"/>
              <path
                d="M705.1 207.9l-16.8-62.5 62.5-16.8 16.8 62.5-62.5 16.8z m2.9-51.2l8.5 31.6 31.6-8.5-8.5-31.6-31.6 8.5z"
                fill="#0A0408"/>
              <path d="M291.4 183.7h216V918h-216z" fill="#EBB866"/>
              <path d="M515.4 926h-232V175.7h232V926z m-216-16h200V191.7h-200V910z" fill="#0A0408"/>
              <path d="M343 246.6h116.8v229.2H343z" fill="#FFFFFF"/>
              <path d="M467.8 483.8H335V238.6h132.8v245.2z m-116.8-16h100.8V254.6H351v213.2z" fill="#0A0408"/>
              <path d="M396.2 783.9m-55.2 0a55.2 55.2 0 1 0 110.4 0 55.2 55.2 0 1 0-110.4 0Z" fill="#FFFFFF"/>
              <path
                d="M396.2 847.1c-34.8 0-63.2-28.3-63.2-63.2s28.3-63.2 63.2-63.2c34.8 0 63.2 28.3 63.2 63.2s-28.4 63.2-63.2 63.2z m0-110.4c-26 0-47.2 21.2-47.2 47.2s21.2 47.2 47.2 47.2 47.2-21.2 47.2-47.2-21.2-47.2-47.2-47.2z"
                fill="#0A0408"/>
              <path d="M712.5 941.5L518.4 217.2" fill="#FFFFFF"/>
              <path d="M510.727 219.228l15.454-4.141 194.074 724.328-15.454 4.141z" fill="#0A0408"/>
            </svg>
            <span class="text-lg font-bold">Prova Facíl</span>
          </a>
        </div>

        <div class="layout-topbar-actions">
          <div class="layout-config-menu">
            <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
              <i
                [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
            </button>
          </div>
          <div class="relative">
            <button
              class="layout-topbar-action layout-topbar-action-highlight"
              pStyleClass="@next"
              enterFromClass="hidden"
              enterActiveClass="animate-scalein"
              leaveToClass="hidden"
              leaveActiveClass="animate-fadeout"
              [hideOnOutsideClick]="true"
            >
              <i class="pi pi-palette"></i>
            </button>
            <app-configurator/>
          </div>
          <!--
        <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden"
                enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout"
                [hideOnOutsideClick]="true">
          <i class="pi pi-ellipsis-v"></i>
        </button>-->


          <p-button icon="pi pi-sign-out" (onClick)="sair()" pTooltip="Sair" [outlined]="true" [rounded]="true"  tooltipPosition="bottom"/>

          <!--
                    <div class="layout-topbar-menu hidden lg:block">
                      <div class="layout-topbar-menu-content">
                        <p-dropdown [options]="menuItems" (onChange)="onMenuItemClick($event)">
                          <ng-template pTemplate="selectedItem">
                            <button type="button" class="layout-topbar-action">
                              <i class="pi pi-user"></i>
                              <span>Profile</span>
                            </button>
                          </ng-template>
                        </p-dropdown>
                      </div>
                    </div>
          -->
        </div>
      </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService, private loginService: LoginService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

  menuItems = [
    { label: 'Resetar Senha', icon: 'pi pi-refresh', command: () => this.resetPassword() },
    { label: 'Sair', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  // Função que será chamada ao clicar em "Resetar Senha"
  resetPassword() {
    console.log('Redefinir senha...');
    // Aqui você pode adicionar a lógica para redefinir a senha
  }

  // Função que será chamada ao clicar em "Sair"
  logout() {
    console.log('Saindo da aplicação...');
    // Aqui você pode adicionar a lógica para deslogar o usuário
  }

  // Função que será chamada ao selecionar um item
  onMenuItemClick(event: any) {
    console.log('Opção selecionada:', event.value);
  }

  sair() {
    this.loginService.logout()
  }
}
