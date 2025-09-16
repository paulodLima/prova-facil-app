import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Toast} from 'primeng/toast';
import {Panel} from 'primeng/panel';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SerieService} from '../serie.service';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {NgIf} from '@angular/common';
import {SerieResponse} from '../../perguntas/perguntas.interface';
import {PostSerieProfessorRequest, PostSerieRequest} from '../serie.interface';
import {Serie} from '../../auth/interface/login.interface';
import {MultiSelect} from 'primeng/multiselect';
import {PerguntasService} from '../../perguntas/perguntas.service';

@Component({
  selector: 'app-serie-form',
  imports: [
    Toast,
    Panel,
    ReactiveFormsModule,
    Button,
    InputText,
    ConfirmDialog,
    NgIf,
    MultiSelect,
    FormsModule
  ],
  providers: [MessageService, ConfirmationService],
  standalone: true,
  templateUrl: './serie-form.component.html',
  styleUrl: './serie-form.component.scss'
})
export class SerieFormComponent implements OnInit {
  series: Serie[] = [];
  seriesAtuais: SerieResponse[] = [];

  public form: FormGroup = new FormGroup({
    serie: new FormControl<number[] | null>(null, Validators.required)
  });

  constructor(private perguntasService: PerguntasService,private route: Router, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private router: Router, private serieService: SerieService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.serieService.getSeries().subscribe(series => {
      this.series = series;

      this.perguntasService.getSeries().subscribe(seriesAtuais => {
        this.seriesAtuais = seriesAtuais;

        const idsSelecionados = this.seriesAtuais.map(s => s.id);
        this.form.patchValue({
          serie: idsSelecionados
        });
      });
    });
  }

  salvar() {
    let serie: PostSerieProfessorRequest = {
      serie: this.form.value.serie
    }
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
  }

  cancelar() {
    this.route.navigate([`/inicio/serie`]);
  }

}
