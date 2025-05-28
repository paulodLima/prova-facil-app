import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AssuntoService} from '../assunto.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Panel} from 'primeng/panel';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {PostSerieRequest} from '../../serie/serie.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-assunto-form',
  imports: [
    Toast,
    ConfirmDialog,
    Panel,
    ReactiveFormsModule,
    Button,
    InputText,
    NgIf
  ],
  providers: [ConfirmationService, MessageService],
  standalone: true,
  templateUrl: './assunto-form.component.html',
  styleUrl: './assunto-form.component.scss'
})
export class AssuntoFormComponent implements OnInit{
  editando = false;
  form: FormGroup = new FormGroup({
    id: new FormControl<string | null>(null),
    nome: new FormControl<string | null>(null, Validators.required)
  });

  constructor(private assuntoService: AssuntoService, private activatedRoute: ActivatedRoute,private confirmationService: ConfirmationService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
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
    let serie: PostSerieRequest = {
      nome:  this.form.value.nome
    }
    if(!this.editando){
      this.assuntoService.cadastrarAssunto(serie).subscribe({
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
      this.assuntoService.atualizarAssunto(serie, this.form.value.id).subscribe({
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
