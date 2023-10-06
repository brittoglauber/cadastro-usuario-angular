import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValorCompatilhadoService {

  private nomeUsuarioKey = 'nomeUsuario';


  atualizarNome(novoNome: string) {
    localStorage.setItem(this.nomeUsuarioKey, novoNome)
  }

  obterNome(): string {
    return localStorage.getItem(this.nomeUsuarioKey) || '';
  }

}
