import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Toast} from 'primeng/toast';
import {Panel} from 'primeng/panel';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SerieService} from '../serie.service';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {PostSerieRequest} from '../serie.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-serie-form',
  imports: [
    Toast,
    Panel,
    ReactiveFormsModule,
    Button,
    InputText,
    ConfirmDialog,
    NgIf
  ],
  providers: [MessageService,ConfirmationService ],
  standalone: true,
  templateUrl: './serie-form.component.html',
  styleUrl: './serie-form.component.scss'
})
export class SerieFormComponent implements OnInit{
  editando = false;
  public form: FormGroup = new FormGroup({
    id: new FormControl<string | null>(null),
    nome: new FormControl<string | null>(null, Validators.required)
  });

  constructor( private route: Router,private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private router: Router, private serieService: SerieService, private messageService: MessageService){
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editando = true;
        this.serieService.getSeriePorId(params['id']).subscribe(serie => {
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
      this.serieService.cadastrarSerie(serie).subscribe({
        next: response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Série cadastrada com sucesso.',
          });

          setTimeout(() => {
            this.router.navigate(['/inicio/serie']);
          }, 1000);
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    } else {
      this.serieService.atualizarSerie(serie, this.form.value.id).subscribe({
        next: response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Série atualizada com sucesso.',
          });

          setTimeout(() => {
            this.router.navigate(['/inicio/serie']);
          }, 1000);
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }

  }

  cancelar() {
    this.route.navigate([`/inicio/serie`]);
  }

}
