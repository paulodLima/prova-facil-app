import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import {Tooltip} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {Image} from 'primeng/image';

@Component({
    selector: 'app-topbar',
    standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, DropdownModule, NgOptimizedImage, Image],
    template: `
      <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
          <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
            <i class="pi pi-bars"></i>
          </button>
          <a class="layout-topbar-logo" routerLink="/">
            <p-image src="https://www.centrus.org.br/folders/imagens/logo.png" alt="Image" width="50" height="50" />
            <span class="text-base">Plataforma de Gestão Integrada</span>
          </a>
        </div>

        <div class="layout-topbar-actions">
          <div class="layout-config-menu">
            <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
              <i
                [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
            </button>
          </div>
          <div class="relative" style="display: none">
            <button
              class="layout-topbar-action layout-topbar-action-highlight"
              pStyleClass="@next"
              enterFromClass="hidden"
              enterActiveClass="animate-scalein"
              leaveToClass="hidden"
              leaveActiveClass="animate-fadeout"
              [hideOnOutsideClick]="true"
              disabled
            >
              <i class="pi pi-palette"></i>
            </button>
            <app-configurator/>
          </div>
          <!--Botão que muda a cor do menu-->
          <!--
        <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden"
                enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout"
                [hideOnOutsideClick]="true">
          <i class="pi pi-ellipsis-v"></i>
        </button>

          -->

          <div class="layout-topbar-menu hidden lg:block">
            <div class="layout-topbar-menu-content">
              <button type="button" class="layout-topbar-action">
                <i class="pi pi-user"></i>
                <span>Profile</span>
              </button>
            </div>
          </div>
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

    constructor(public layoutService: LayoutService) {}

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
}
