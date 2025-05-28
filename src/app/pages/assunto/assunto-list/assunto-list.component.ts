import {Component, OnInit} from '@angular/core';
import {PerguntasService} from '../../perguntas/perguntas.service';
import {AssuntoResponse} from '../../perguntas/perguntas.interface';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AssuntoService} from '../assunto.service';

@Component({
  selector: 'app-assunto-list',
  imports: [
    Toast,
    ConfirmDialog,
    Panel,
    TableModule,
    ButtonDirective,
    Button
  ],
  providers: [ConfirmationService, MessageService],
  standalone: true,
  templateUrl: './assunto-list.component.html',
  styleUrl: './assunto-list.component.scss'
})
export class AssuntoListComponent implements OnInit{
  assuntoResponse: AssuntoResponse[] = [];

  constructor(private perguntasService: PerguntasService, private route: Router,private confirmationService: ConfirmationService, private messageService: MessageService, private assuntoService: AssuntoService) {
  }
  ngOnInit(): void {
    this.perguntasService.getAssunto().subscribe({
      next: response => {
        this.assuntoResponse = response;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  excluir(assunto: any) {
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
          this.assuntoService.excluirAssunto(assunto.id).subscribe({
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
    this.route.navigate([`/inicio/assunto/cadastro`]);
  }

  editar(assunto: any) {
    this.route.navigate([`/inicio/assunto/${assunto.id}`]);
  }
}
