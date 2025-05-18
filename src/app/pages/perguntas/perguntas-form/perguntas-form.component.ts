import {Component, OnInit} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumber} from 'primeng/inputnumber';
import {Button, ButtonDirective} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Calendar} from 'primeng/calendar';
import {DatePicker} from 'primeng/datepicker';
import {PerguntasService} from '../perguntas.service';
import {Page, PerguntaResponse, SerieResponse} from '../perguntas.interface';
import {SelectButton} from 'primeng/selectbutton';
import {Chips} from 'primeng/chips';

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
    Select,
    FormsModule,
    DropdownModule,
    Button,
    Panel,
    InputText,
    SelectButton,
    Textarea,
    ButtonDirective,
    NgForOf,
  ],
  templateUrl: './perguntas-form.component.html',
  standalone: true,
  styleUrl: './perguntas-form.component.scss'
})
export class PerguntasFormComponent implements OnInit{
  resultado = false;
  cdEv: string = '';
  rangeDates: Date[] | undefined;
  situacaoDocumento: situacaoDocumento[] = [];
  selectSituacaoDocumento: situacaoDocumento | undefined;
  grupos: grupo[] = [];
  subGrupos: subGrupo[] = [];
  supraHistorico: subGrupo[] = [];
  tipoDocumento: tipoDocumento[] = [];
  seriesResponse: SerieResponse[] = [];
  selectTipoDocumento: tipoDocumento | undefined;
  stateOptions: any[] = [{ label: 'Múltipla escolha', value: '1' },{ label: 'Dissertativa', value: '2' }];
  respostasIncorretas: string[] = [];

  value: string = 'off';

  constructor(private perguntasService: PerguntasService) {
  }
  ngOnInit(): void {
    this.getSeries()
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

  private getSeries() {
    this.perguntasService.getSeries().subscribe({
      next: response => {
        this.seriesResponse = response
      },
      error: err => {
        console.log(err)
      }
    });
  }

  adicionarResposta() {
    this.respostasIncorretas.push('');
  }

  removerResposta(index: number) {
    this.respostasIncorretas.splice(index, 1);
  }
}
