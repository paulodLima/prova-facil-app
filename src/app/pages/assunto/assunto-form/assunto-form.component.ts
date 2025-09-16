import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AssuntoService} from '../assunto.service';
import {ConfirmationService, MessageService, PrimeTemplate} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Panel} from 'primeng/panel';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {AssuntoResponse} from '../../perguntas/perguntas.interface';
import {DisciplinaResponse, PostAssuntoRequest} from '../assunto.interface';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-assunto-form',
  imports: [
    Toast,
    ConfirmDialog,
    Panel,
    ReactiveFormsModule,
    Button,
    InputText,
    NgIf,
    PrimeTemplate,
    Select
  ],
  providers: [ConfirmationService, MessageService],
  standalone: true,
  templateUrl: './assunto-form.component.html',
  styleUrl: './assunto-form.component.scss'
})
export class AssuntoFormComponent implements OnInit{
  editando = false;
  disciplinaResponses: DisciplinaResponse[] = []

  form: FormGroup = new FormGroup({
    id: new FormControl<string | null>(null),
    disciplina: new FormControl<string | null>(null),
    nome: new FormControl<string | null>(null, Validators.required)
  });

  constructor(private assuntoService: AssuntoService, private activatedRoute: ActivatedRoute,private confirmationService: ConfirmationService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.assuntoService.getDisciplinaPorProfessor().subscribe(result => {
      this.disciplinaResponses = result
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editando = true;
        this.assuntoService.getAssuntoPorId(params['id']).subscribe(serie => {
          this.form.patchValue({
            id: serie.id,
            nome: serie.nome
          })
        });
      }
    })
  }


  salvar() {
    let assunto: PostAssuntoRequest = {
      nome:  this.form.value.nome,
      disciplina:  this.form.value.disciplina,
    }
    if(!this.editando){
      this.assuntoService.cadastrarAssunto(assunto).subscribe({
        next: response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Assunto cadastrada com sucesso.',
          });

          setTimeout(() => {
            this.router.navigate(['/inicio/assunto']);
          }, 1000);
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    } else {
      this.assuntoService.atualizarAssunto(assunto, this.form.value.id).subscribe({
        next: response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Assunto atualizada com sucesso.',
          });

          setTimeout(() => {
            this.router.navigate(['/inicio/assunto']);
          }, 1000);
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  cancelar() {
    this.router.navigate([`/inicio/assunto`]);
  }
}
