import {Component, OnInit, ViewChild} from '@angular/core';
import {AssuntoService} from '../../assunto/assunto.service';
import {GabaritoService} from '../gabarito.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {KeyValue, KeyValuePipe, NgClass, NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {FileUpload, FileUploadModule} from 'primeng/fileupload';
import {Toast} from 'primeng/toast';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-gabarito-form',
  imports: [
    ButtonDirective,
    NgIf,
    TableModule,
    FileUploadModule,
    Toast,
    Tag,
  ],
  templateUrl: './gabarito-form.component.html',
  standalone: true,
  styleUrl: './gabarito-form.component.scss'
})
export class GabaritoFormComponent implements OnInit {

  imagemPreview: string | ArrayBuffer | null = null;
  arquivoSelecionado: any
  resultado: any = null;
  @ViewChild(FileUpload) fileUpload!: FileUpload;
  // Você pode permitir que isso seja editável se quiser
  totalQuestoes = 10;
  gabaritoCorreto: { [key: number]: string } = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'A',
    6: 'A',
    7: 'B',
    8: 'C',
    9: 'D',
    10: 'A'
  };
  ordenarPorChave: any;

  constructor(private gabaritoService: GabaritoService, private router: Router, private messageService: MessageService) {
  }
  ngOnInit(): void {

  }

  onSelecionarArquivo(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.arquivoSelecionado = file;
      const reader = new FileReader();
      reader.onload = () => this.imagemPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  corrigir(): void {
    if (!this.arquivoSelecionado) return;

    const formData = new FormData();

    formData.append('imagem', this.arquivoSelecionado);
    formData.append('gabarito', JSON.stringify(this.gabaritoCorreto));
    formData.append('aluno', "Teste PAulo");
    //formData.append('totalQuestoes', String(this.totalQuestoes));

    this.gabaritoService.corrigirGabarito(formData).subscribe({
      next: res => {
        this.resultado = res;

        this.resultado.detalhesOrdenados = Object.entries(res.detalhes)
          .map(([key, value]: [string, any]) => ({
            questao: Number(key),
            resposta: value.resposta,
            status: value.status
          }))
          .sort((a, b) => a.questao - b.questao);
      },
      error: err => {
        console.error('Erro ao corrigir:', err);
        const erros = err.error.erro;

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

}
