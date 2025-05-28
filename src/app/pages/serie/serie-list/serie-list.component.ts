import {Component, OnInit} from '@angular/core';
import {PerguntasService} from '../../perguntas/perguntas.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {Router} from '@angular/router';
import {PostSerieRequest} from '../serie.interface';
import {SerieService} from '../serie.service';

@Component({
  selector: 'app-serie-list',
  imports: [
    Toast,
    ConfirmDialog,
    Panel,
    TableModule,
    ButtonDirective,
    Button
  ],
  templateUrl: './serie-list.component.html',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  styleUrl: './serie-list.component.scss'
})
export class SerieListComponent implements OnInit {
  seriesResponse: PostSerieRequest[] = [];

  constructor(private perguntasService: PerguntasService,private serieSevice: SerieService, private route: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.perguntasService.getSeries().subscribe({
      next: response => {
        this.seriesResponse = response
      },
      error: err => {
        console.log(err)
      }
    });
  }

  editar(serie: any) {
    this.route.navigate([`/inicio/serie/`.concat(serie.id)]);
  }

  excluir(serie: any) {
    this.confirmationService.confirm({
      message: 'Ao continuar, não será mais possivel recuperar a série. Deseja confirmar?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-text",
      acceptLabel: "Confirmar",
      rejectButtonStyleClass: "p-button-danger p-button-text mr-4",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.serieSevice.excluirSerie(serie.id).subscribe({
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

  cadastrar() {
    this.route.navigate([`/inicio/serie/cadastro`]);
  }
}
