import {Component, OnInit} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumber} from 'primeng/inputnumber';
import {Button, ButtonDirective} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Calendar} from 'primeng/calendar';
import {PerguntasService} from '../perguntas.service';
import {
  AlternativaErradaResponse,
  AssuntoResponse,
  PerguntasResponse, PostPerguntaRequest,
  SerieResponse
} from '../perguntas.interface';
import {SelectButton} from 'primeng/selectbutton';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

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
    ReactiveFormsModule,
    NgIf,
    Toast,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './perguntas-form.component.html',
  standalone: true,
  styleUrl: './perguntas-form.component.scss'
})
export class PerguntasFormComponent implements OnInit {
  seriesResponse: SerieResponse[] = [];
  assuntoResponse: AssuntoResponse[] = [];
  stateOptions: any[] = [{label: 'Múltipla escolha', value: 1}, {label: 'Dissertativa', value: 2}];
  respostasIncorretas: AlternativaErradaResponse[] = [];
  respostasIniciais: AlternativaErradaResponse[] = [];
  dificuldades: any[] = [{label: 'Fácil', value: 'FACIL'}, {label: 'Médio', value: 'MEDIO'}, {
    label: 'Difícil',
    value: 'DIFICIL'
  }];
  editando = false;
  value: string = 'off';
  tipoPergunta: number | null = 1;

  form: FormGroup = new FormGroup({
    id: new FormControl<string | null>(null),
    enunciado: new FormControl<string | null>(null, Validators.required),
    respostaCorreta: new FormControl<string | null>(null, Validators.required),
    tipoProva: new FormControl<number | null>(null, Validators.required),
    serie: new FormControl<number | null>(null, Validators.required),
    assunto: new FormControl<number | null>(null, Validators.required),
    dificuldade: new FormControl<string | null>(null, Validators.required),
    alternativasErradas: new FormArray([]),
  });

  constructor(private perguntasService: PerguntasService, private activatedRoute: ActivatedRoute, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getSeries();
    this.getAssunto();
    this.getDificuldade();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editando = true;
        this.perguntasService.getPerguntaPorId(params['id']).subscribe(pergunta => {
          this.form.patchValue({
            id: pergunta.id,
            enunciado: pergunta.enunciado,
            respostaCorreta: pergunta.respostaCorreta,
            tipoProva: tipoMap[pergunta.tipo] || null,
            serie: pergunta.serie.id,
            assunto: pergunta.assunto.id,
            dificuldade: pergunta.nivel,
          })
          this.respostasIniciais = JSON.parse(JSON.stringify(pergunta.alternativasErradas));
          this.respostasIncorretas = JSON.parse(JSON.stringify(pergunta.alternativasErradas));
          this.preencherAlternativas(pergunta.alternativasErradas);
          this.tipoPergunta = tipoMap[pergunta.tipo] || null;
        });
      }
    })
    const tipoMap: Record<string, number> = {
      'MULTIPLAESCOLHA': 1,
      'DISSERTATIVA': 2
    };
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

  get alternativasErradas(): FormArray {
    return this.form.get('alternativasErradas') as FormArray;
  }

  cancelar() {
    this.router.navigate(['/inicio/perguntas']);
  }


  preencherAlternativas(arr: AlternativaErradaResponse[]) {
    const alternativasArray = this.form.get('alternativasErradas') as FormArray;
    alternativasArray.clear();

    arr.forEach(alternativa => {
      alternativasArray.push(new FormGroup({
        id: new FormControl(alternativa.id),
        texto: new FormControl(alternativa.texto),
        idPergunta: new FormControl(alternativa.idPergunta)
      }));
    });
  }

  removerResposta(index: number) {
    this.alternativasErradas.removeAt(index);
  }

  adicionarResposta() {
    this.alternativasErradas.push(
      new FormGroup({
        id: new FormControl(null),
        texto: new FormControl(''),
        idPergunta: new FormControl(null)
      })
    );
  }

  private getAssunto() {
    this.perguntasService.getAssunto().subscribe({
      next: response => {
        this.assuntoResponse = response;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  private getDificuldade() {
    this.perguntasService.getDificuldade().subscribe({
      next: response => {
        this.seriesResponse = response
      },
      error: err => {
        console.log(err)
      }
    });
  }

  salvar() {
    if (this.editando) {
      const alternativasArray = this.form.get('alternativasErradas') as FormArray;

      const respostasAtuais: AlternativaErradaResponse[] = alternativasArray.value;

      const removidas = this.respostasIniciais.filter(orig =>
        !respostasAtuais.some(atual => atual.id === orig.id)
      );

      const novas = respostasAtuais.filter(res => !res.id);

      const atualizadas = respostasAtuais.filter(atual => {
        const original = this.respostasIniciais.find(orig => orig.id === atual.id);
        return original && original.texto !== atual.texto;
      });

      removidas.forEach(res => this.excluirResposta(res.id));

      novas.forEach(res => {
        res.idPergunta = this.form.value.id
        this.criarAlternativaErrada(res)
      });

      atualizadas.forEach(res => this.atualizarAlternativaErrada(res));

      this.atualizarPergunta();
    } else {
      this.criarPergunta();

    }
  }

  excluirResposta(id: number) {
    this.perguntasService.deleteAlternativaErrada(id).subscribe({
      next: response => {
      },
      error: err => {
        console.log(err)
      }
    });
  }

  criarAlternativaErrada(res: AlternativaErradaResponse) {
    this.perguntasService.criarAlternativaErrada(res).subscribe({
      next: response => {
      },
      error: err => {
        console.log(err)
      }
    });
  }

  atualizarAlternativaErrada(res: AlternativaErradaResponse) {
    this.perguntasService.atualizarAlternativaErrada(res).subscribe({
      next: response => {
      },
      error: err => {
        console.log(err)
      }
    });
  }

  private atualizarPergunta() {
    let pergunta: PerguntasResponse = {
      id: this.form.value.id,
      enunciado: this.form.value.enunciado,
      respostaCorreta: this.form.value.respostaCorreta,
      tipo: this.form.value.tipoProva,
      nivel: this.form.value.dificuldade,
      serie: this.form.value.serie,
      assunto: this.form.value.assunto,
    }

    this.perguntasService.atualizarPergunta(pergunta).subscribe({
      next: response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pergunta Atualizada.',
        });

        setTimeout(() => {
          this.router.navigate(['/inicio/perguntas']);
        }, 1000);
      },
      error: err => {
        console.log(err)
      }
    })
  }
  private criarPergunta() {
    let pergunta: PostPerguntaRequest = {
      enunciado: this.form.value.enunciado,
      respostaCorreta: this.form.value.respostaCorreta,
      tipo: this.form.value.tipoProva,
      dificuldade: this.form.value.dificuldade,
      professor: 0,
      serie: this.form.value.serie,
      assunto: this.form.value.assunto,
      alternativasErradas: this.form.value.alternativasErradas.map((alt: AlternativaErradaResponse) => ({
        texto: alt.texto
      }))
    }
    this.perguntasService.criarPergunta(pergunta).subscribe({
      next: response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pergunta cadastrada com sucesso.',
        });

        setTimeout(() => {
          this.router.navigate(['/inicio/perguntas']);
        }, 1000);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  atualizarTipoPergunta(value: any) {
    this.tipoPergunta = value
  }

}
