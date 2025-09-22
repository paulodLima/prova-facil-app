import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {AppFloatingConfigurator} from '../../layout/component/app.floatingconfigurator';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxMaskDirective} from 'ngx-mask';
import {Toast} from 'primeng/toast';
import {NgIf} from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelect} from 'primeng/multiselect';
import {Tooltip} from 'primeng/tooltip';
import {Select, SelectItem} from 'primeng/select';
import {Panel} from 'primeng/panel';
import {EscolaFormComponent} from '../escola/escola-form/escola-form.component';
import {Dialog} from 'primeng/dialog';
import {PostEscolaRequest, STATE_OPTIONS} from '../escola/escola.interface';
import {FileUpload, FileUploadEvent} from 'primeng/fileupload';
import {LoginService} from './service/login.service';
import {ArquivoRequest} from '../perguntas/perguntas.interface';
import {EscolaService} from '../escola/escola.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ButtonModule, RouterModule, RippleModule, AppFloatingConfigurator, ButtonModule, InputText, Password, ReactiveFormsModule, FormsModule, Toast, NgIf, DropdownModule, MultiSelect, Tooltip, SelectItem, Panel, EscolaFormComponent, Dialog, NgxMaskDirective, Select, FileUpload],
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
              <span class="text-muted-color font-medium">Preencha os dados para completar o cadastro da Escola</span>
            </div>
            <form [formGroup]="form" class="box " enctype="multipart/form-data">
              <div>
                <div>
                  <label for="escola" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
                    Nome da Escola
                  </label>
                  <input formControlName="nome" class="w-full md:w-[30rem]" pInputText/>
                </div>
                <p class="text-red-700 text-sm"
                   *ngIf="form.get('nome')?.touched && form.get('nome')?.hasError('required')">
                  O campo nome é obrigatório.
                </p>

              <div class="mt-4">
                <label for="email1"
                       class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>

                <input formControlName="email" pInputText mask="A*@A*.A*" class="w-full md:w-[30rem]"
                       [validation]="true" [dropSpecialCharacters]="false"/>
                <p class="text-red-700 text-sm"
                   *ngIf="form.get('email')?.touched && form.get('email')?.hasError('required')">
                  O campo de email é obrigatório.
                </p>
                <p class="text-red-700 text-sm"
                   *ngIf="form.get('email')?.touched && form.get('email')?.hasError('email')">
                  Informe um e-mail válido.
                </p>
              </div>

                <div class="mt-4">
                  <label for="estado" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
                    Estado
                  </label>
                  <p-select class="inline-grid w-full md:w-[30rem]"
                            [options]="estados"
                            [filter]="true"
                            formControlName="estado"
                            optionLabel="label"
                            optionValue="label"
                            placeholder="Selecione o estado"
                            required>
                    <ng-template let-serie pTemplate="selectedItem" class="text-xs">
                      {{ serie.label }}
                    </ng-template>
                    <ng-template let-serie pTemplate="item" class="text-xs">
                      {{ serie.label }}
                    </ng-template>
                  </p-select>
                  <p class="text-red-700 text-sm"
                     *ngIf="form.get('estado')?.touched && form.get('estado')?.hasError('required')">
                    O campo estado é obrigatório.
                  </p>

                </div>
                <div class="mt-4">
                  <label for="serie" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
                    Logo da Escola
                  </label>
                  <p-fileUpload #fileUpload class="file-upload-custom space-x-4" name="Carregar Imagem"
                                url="https://www.primefaces.org/cdn/api/upload.php"
                                (onUpload)="onUpload($event,'logoEscola')"
                                [multiple]="false"
                                [maxFileSize]="4194304"
                                accept="image/*"
                                chooseLabel="Adicionar" uploadLabel="Enviar" cancelLabel="Cancelar">
                  </p-fileUpload>
                </div>
                <div class="mt-4">
                  <label for="serie" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">
                    Logo da Secretaria de Educação
                  </label>
                  <p-fileUpload #fileUpload class="file-upload-custom space-x-4" name="Carregar Imagem"
                                url="https://www.primefaces.org/cdn/api/upload.php"
                                (onUpload)="onUpload($event,'logoSecretaria')"
                                [multiple]="false"
                                [maxFileSize]="4194304"
                                accept="image/*"
                                chooseLabel="Adicionar" uploadLabel="Enviar" cancelLabel="Cancelar">
                  </p-fileUpload>

                  <p-button label="Cadastrar" [outlined]="true" styleClass="w-full mt-5"
                            (onClick)="cadastraEscola()" [disabled]="form.invalid || arquivoRequest.length !== 2"></p-button>
                  <p-button label="Cancelar" [outlined]="true" severity="danger" styleClass="w-full mt-5"
                            (onClick)="Cancelar()"></p-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})

export class CriarEscola implements OnInit{
  form: FormGroup;
  estados = STATE_OPTIONS;
  arquivoRequest: ArquivoRequest[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private service: EscolaService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
    });
  }

  Cancelar() {
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
  }

  cadastraEscola() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = new FormData();

    let escola: PostEscolaRequest = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      estado: this.form.value.estado,
    }

    formData.append("request", new Blob([JSON.stringify(escola)], {type: "application/json"}));
    this.arquivoRequest.forEach(file => formData.append('arquivos', file.arquivo, file.nomeArquivo));

    this.service.cadastrarEscola(formData).subscribe({
      next: response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Escola cadastrada com sucesso. Será enviado um e-mail para criação da sua senha.',
        });
        this.form.reset
        this.arquivoRequest = []
        setTimeout(() => {
        this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  onUpload(event: FileUploadEvent, nome: string) {
    for (let file of event.files) {
      this.addDocumento(file, nome)
    }
  }

  addDocumento(file: File, nome: string) {
    const novoFile = new File([file], nome, {type: file.type});
    const arquivo: ArquivoRequest = {
      dataDocumento: new Date(),
      nomeArquivo: nome,
      arquivo: novoFile,
    };
    this.arquivoRequest.push(arquivo);
  }
}
