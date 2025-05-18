import {Component, OnInit} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {Button, ButtonDirective} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {DatePicker} from 'primeng/datepicker';
import {TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Page, PerguntaResponse} from '../perguntas.interface';
import {Dialog} from 'primeng/dialog';
import {PerguntasService} from '../perguntas.service';
import {Route, Router} from '@angular/router';

interface situacaoDocumento {
  situacao: number,
  descricao: string
}

interface tipoDocumento {
  codigo: number,
  nome: string
}

interface grupo {
  codigo: number,
  descricao: string
}

interface subGrupo {
  codigo: number,
  descricao: string
}

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
  ],
  templateUrl: './perguntas-list.component.html',
  standalone: true,
  styleUrl: './perguntas-list.component.scss'
})
export class PerguntasListComponent implements OnInit{
  resultado = false;
  cdEv: string = '';
  rangeDates: Date[] | undefined;
  situacaoDocumento: situacaoDocumento[] = [];
  selectSituacaoDocumento: situacaoDocumento | undefined;
  grupos: grupo[] = [];
  subGrupos: subGrupo[] = [];
  supraHistorico: subGrupo[] = [];
  tipoDocumento: tipoDocumento[] = [];
  selectTipoDocumento: tipoDocumento | undefined;
  page: Page<PerguntaResponse> | null = null;
  perguntas: PerguntaResponse[] = [];
  constructor(private perguntasService: PerguntasService, private route: Router) {
  }

  ngOnInit(): void {
    this.perguntasService.getPeguntas().subscribe(page => {
      this.page = page;
      this.perguntas = this.page.content ?? [];
    });

    this.situacaoDocumento = [
      {situacao: 1, descricao: 'Gerado'},
      {situacao: 3, descricao: 'Liquidado'},
      {situacao: 5, descricao: 'Cancelado'},
      {situacao: 7, descricao: 'Liberado p/ contabilização'},
      {situacao: 9, descricao: 'Contabilizado'},
      {situacao: 11, descricao: 'Estornado'},
      {situacao: 13, descricao: 'Previsto'},
      {situacao: 15, descricao: 'Cancelado para contabilização'},
      {situacao: 99, descricao: 'Todos'},
    ]

    this.tipoDocumento = [
      {codigo: 1, nome: 'Controle de Aplicações Financeiras'},
      {codigo: 3, nome: 'Autorização de Recebimento'},
      {codigo: 5, nome: 'Autorização de Pagamento'},
      {codigo: 7, nome: 'Autorização Contabil'},
      {codigo: 9, nome: 'Autorização de Transferência'},
    ]

    this.grupos = [
      {codigo: 1, descricao: 'Previdencial'},
      {codigo: 2, descricao: 'Assistencial'},
      {codigo: 3, descricao: 'Administrativo'},
      {codigo: 4, descricao: 'Investimento'},
      {codigo: 5, descricao: 'Permanente'},
    ]

    this.supraHistorico = [
      {codigo: 90, descricao: 'Aposentadoria'},
      {codigo: 91, descricao: 'Pensão'},
      {codigo: 92, descricao: 'Peculio'},
      {codigo: 93, descricao: 'Poupança'},
      {codigo: 94, descricao: 'Auxilio'},
      {codigo: 95, descricao: 'Abono de Natal'},
      {codigo: 96, descricao: 'Contribuição - PREVI'},
      {codigo: 97, descricao: 'Idenização Trabalhista'},
      {codigo: 102, descricao: 'Beneficios'},
    ]

    this.subGrupos = [
      {codigo: 1, descricao: 'Beneficio'},
      {codigo: 2, descricao: 'Contribuicao'},
    ]
  }

  modalVisivel: boolean = false;
  perguntaSelecionada!: PerguntaResponse | null;

  visualizar(pergunta: PerguntaResponse) {
    this.perguntaSelecionada = pergunta;
    this.modalVisivel = true;
  }

  editar(pergunta: any) {
    this.route.navigate(['/inicio/perguntas/editar'])
  }

  excluir(pergunta: any) {

  }
}
