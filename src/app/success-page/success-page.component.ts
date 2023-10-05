import { Component, OnInit } from '@angular/core';
import { ValorCompatilhadoService } from '../valor-compatilhado.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  nomeUsuario: string = '';

  constructor(private atualizarNome: ValorCompatilhadoService) {}

  ngOnInit(): void {
      this.atualizarNome.valorAtual.subscribe((nomeUsuario) => {
        this.nomeUsuario = nomeUsuario
      })
  }

}
