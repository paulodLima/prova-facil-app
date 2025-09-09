import {Component, OnInit} from '@angular/core';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService, PrimeTemplate} from 'primeng/api';
import {Panel} from 'primeng/panel';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NgClass, NgIf} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {Select} from 'primeng/select';
import {SelectButton} from 'primeng/selectbutton';
import {InputNumber} from 'primeng/inputnumber';
import {ProvaService} from '../prova.service';
import {ProvaRequest} from '../prova.interface';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-prova-form',
  imports: [
    Toast,
    ConfirmDialog,
    Panel,
    InputText,
    ReactiveFormsModule,
    NgClass,
    ButtonDirective,
    NgIf,
    PrimeTemplate,
    Select,
    SelectButton,
    InputNumber,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './prova-form.component.html',
  standalone: true,
  styleUrl: './prova-form.component.scss'
})
export class ProvaFormComponent implements OnInit {
  form: FormGroup;
  provaVisible = false;
  pdfUrl: any

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService, private provaService: ProvaService, private sanitizer: DomSanitizer) {
    this.form = this.fb.group({
      totalQuestoes: [null, [Validators.required, Validators.min(1)]],
      facil: [0, [Validators.required, Validators.min(0)]],
      medio: [0, [Validators.required, Validators.min(0)]],
      dificil: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
  }

  get soma(): number {
    const {facil, medio, dificil} = this.form.value;
    return (facil || 0) + (medio || 0) + (dificil || 0);
  }

  get restante(): number {
    return (this.form.value.totalQuestoes || 0) - this.soma;
  }

  get valido(): boolean {
    return this.form.valid && this.restante === 0;
  }

  gerarProva() {
    if (this.valido) {
      this.gerarProvaPdf()
      const dados: ProvaRequest = this.form.value;
      this.provaService.gerar(dados).subscribe({
        next: (res) => {
          console.log('✅ Prova gerada:', res)
          this.provaVisible = true;

        },
        error: (err) => console.error('❌ Erro ao gerar prova:', err)
      });
    }
  }

  gerarProvaPdf() {
    if (this.valido) {
      const dados: ProvaRequest = this.form.value;
      this.provaService.gerarPdf(dados).subscribe({
        next: blob => {
          if (blob.type === 'application/pdf') {
            const url = window.URL.createObjectURL(blob);
            console.log('url', url)
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); // ⚡ marca como segura
          } else {
            console.error('Não é PDF, provavelmente erro do backend');
          }
        },
        error: err => console.error('Erro ao gerar PDF:', err)
      });
    }
  }

}
