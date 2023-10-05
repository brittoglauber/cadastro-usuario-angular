import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValorCompatilhadoService {

  private nomeUsuario = new BehaviorSubject<string>('');
  valorAtual = this.nomeUsuario.asObservable();

  atualizarNome(novoNome: string) {
    this.nomeUsuario.next(novoNome);
  }


}
