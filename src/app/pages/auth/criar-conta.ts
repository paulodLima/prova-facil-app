import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {AppFloatingConfigurator} from '../../layout/component/app.floatingconfigurator';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskDirective} from 'ngx-mask';
import {LoginService} from './service/login.service';
import {PostProfessorRequest} from './interface/login.interface';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ButtonModule, RouterModule, RippleModule, AppFloatingConfigurator, ButtonModule, InputText, Password, ReactiveFormsModule, FormsModule, Toast, NgIf],
  template: `
    <app-floating-configurator/>
    <p-toast></p-toast>
    <div
      class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
            <div class="text-center mb-8">
              <svg style="display: ruby" width="80px" height="80px" viewBox="0 0 1024 1024" class="icon" version="1.1"
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
                <path
                  d="M722.664239 791.097256a55.2 55.2 0 1 0 106.63871-28.571762 55.2 55.2 0 1 0-106.63871 28.571762Z"
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
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bem Vindo ao Prova Fácil</div>
              <span class="text-muted-color font-medium">Preencha os dados para completar o cadastro</span>
            </div>

            <div>
              <label for="email1"
                     class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Nome</label>
              <input
                pInputText
                id="nome"
                name="nome"
                [(ngModel)]="nome"
                #nomeModel="ngModel"
                required
                type="text"
                placeholder="Nome Completo"
                class="w-full md:w-[30rem] mb-2"
              />
              <div *ngIf="nomeModel.invalid && nomeModel.touched" class="text-red-500 text-sm mb-4">
                O nome é obrigatório.
              </div>
              <label for="email1"
                     class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
              <input
                pInputText
                id="email1"
                name="email"
                [(ngModel)]="email"
                #emailModel="ngModel"
                required
                type="email"
                placeholder="Email"
                class="w-full md:w-[30rem] mb-2"
              />
              <div *ngIf="emailModel.touched && emailModel.invalid" class="text-red-500 text-sm">
                <div *ngIf="emailModel.errors?.['email']">Informe um email válido.</div>
                <div *ngIf="emailModel.errors?.['required']">O email é obrigatório.</div>
              </div>

              <label for="password1"
                     class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
              <p-password id="password1"
                          #passwordField="ngModel"
                          [(ngModel)]="senha"
                          name="password"
                          placeholder="Senha"
                          [toggleMask]="true"
                          styleClass="mb-4"
                          [fluid]="true"
                          [feedback]="true"
                          weakLabel="Fraca"
                          mediumLabel="Média"
                          strongLabel="Forte"
                          required>
              </p-password>

              <span *ngIf="passwordField.invalid && passwordField.touched"
                    class="text-danger flex -mt-4 text-red-700 mb-4">
                    O campo senha é obrigatório.
                </span>

              <p-button label="Finalizar" [outlined]="true" styleClass="w-full mt-5" (onClick)="cadastrar()"></p-button>
              <p-button label="Cancelar" [outlined]="true" severity="danger" styleClass="w-full mt-5"
                        (onClick)="Cancelar()"></p-button>
            </div>
          </div>
        </div>
      </div>
    </div>`
})

export class CriarConta {
  email: string = '';
  nome: string = '';
  senha: string = '';

  constructor(private loginService: LoginService, private messageService: MessageService, private router: Router) {
  }

  cadastrar(): void {
    const request: PostProfessorRequest = {
      email: this.email,
      nome: this.nome,
      senha: this.senha
    };

    this.loginService.cadastrarProfessorLogin(request).subscribe({
      next: response => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Cadastro Realizado com Sucesso!'});
        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      },
      error: err => {
        const erros = err.error.erros;

        const erroDetalhado = Array.isArray(erros)
          ? erros.map((e: any) => e.message || JSON.stringify(e)).join('\n')
          : typeof erros === 'string'
            ? erros
            : 'Erro desconhecido.';

        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: erroDetalhado
        });
      }
    });
  }

  Cancelar() {
    this.router.navigate(['/auth/login']);
  }
}
