import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import { Usuario } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:3000/usuarios'

  constructor(private http: HttpClient) { }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario)
  }

  listarUsuarioPorId(email: number): Observable<Usuario> {
    const url = `${this.API}?email=${email}`
    return this.http.get<Usuario>(url)
  }
}
