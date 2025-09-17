import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Panel} from 'primeng/panel';
import {InputNumber} from 'primeng/inputnumber';
import {NgIf} from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';
import {ConfirmationService, MessageService, PrimeTemplate} from 'primeng/api';
import {PostEscolaRequest, STATE_OPTIONS} from '../escola.interface';
import {Select} from 'primeng/select';
import {InputText} from 'primeng/inputtext';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {FileUpload, FileUploadEvent} from 'primeng/fileupload';
import {Tooltip} from 'primeng/tooltip';
import {
  AlternativaErradaResponse,
  ArquivoRequest,
  DetalheArquivo,
  PostPerguntaRequest
} from '../../perguntas/perguntas.interface';
import {EscolaService} from '../escola.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-escola-form',
  imports: [
    Toast,
    ConfirmDialog,
    Panel,
    ReactiveFormsModule,
    InputNumber,
    NgIf,
    ButtonDirective,
    PrimeTemplate,
    Select,
    InputText,
    NgxMaskDirective,
    FileUpload,
    Tooltip,
    Button
  ],
  providers: [ConfirmationService, MessageService, provideNgxMask()],
  templateUrl: './escola-form.component.html',
  standalone: true,
  styleUrl: './escola-form.component.scss'
})
export class EscolaFormComponent implements OnInit {
  form: FormGroup;
  estados = STATE_OPTIONS;
  arquivoRequest: ArquivoRequest[] = [];
  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();


  constructor(private fb: FormBuilder, private service: EscolaService, private router: Router, private messageService: MessageService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
    });
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
          detail: 'Escola cadastrada com sucesso.',
        });
        this.form.reset
        this.arquivoRequest = []
        this.salvar.emit(response);
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
  cancelarCadastro() {
    this.cancelar.emit();
  }
}
