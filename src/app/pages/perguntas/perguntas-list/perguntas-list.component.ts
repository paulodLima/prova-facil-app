import {Component, OnInit, ViewChild} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {Button, ButtonDirective} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {DatePicker} from 'primeng/datepicker';
import {Table, TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Page, PerguntaResponse} from '../perguntas.interface';
import {Dialog} from 'primeng/dialog';
import {PerguntasService} from '../perguntas.service';
import {Route, Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-perguntas-form',
  imports: [
    FormsModule,
    DropdownModule,
    Panel,
    TableModule,
    Tooltip,
    SlicePipe,
    DatePipe,
    ButtonDirective,
    Dialog,
    NgForOf,
    NgIf,
    Toast,
    ConfirmDialog,
    InputText,
  ],
  providers:[ConfirmationService,MessageService],
  templateUrl: './perguntas-list.component.html',
  standalone: true,
  styleUrl: './perguntas-list.component.scss'
})
export class PerguntasListComponent implements OnInit {
  page: Page<PerguntaResponse> | null = null;
  perguntas: PerguntaResponse[] = [];
  @ViewChild('dt') dt: Table | undefined;
  constructor(private perguntasService: PerguntasService, private route: Router, private confirmationService: ConfirmationService,private messageService: MessageService,private router: Router,) {
  }

  ngOnInit(): void {
    this.perguntasService.getPeguntas().subscribe(page => {
      this.page = page;
      this.perguntas = this.page.content ?? [];
    });
  }

  modalVisivel: boolean = false;
  perguntaSelecionada!: PerguntaResponse | null;

  visualizar(pergunta: PerguntaResponse) {
    this.perguntaSelecionada = pergunta;
    this.modalVisivel = true;
  }

  editar(pergunta: any) {
    this.route.navigate([`/inicio/perguntas/${pergunta.id}`]);
  }

  excluir(pergunta: any) {
    this.confirmationService.confirm({
      message: 'Ao continuar, não será mais possivel recuperar a pergunta. Deseja confirmar?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-text",
      acceptLabel:"Confirmar",
      rejectButtonStyleClass: "p-button-danger p-button-text mr-4",
      rejectLabel:"Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.perguntasService.excluirPergunta(pergunta.id).subscribe({
          next: response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'excluída com sucesso.',
            });
            this.ngOnInit();
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Cancelar', detail: 'Você cancelou a exclusão'});
      }
    });
  }

  onFilterInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(inputElement.value, 'contains');
    }
  }
}
