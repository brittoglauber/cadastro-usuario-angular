import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces';
import { ValorCompatilhadoService } from '../valor-compatilhado.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  formulario!: FormGroup
  erroSenha = false
  usuarioNaoEncontrado = false
  nomeDoUsuario: string = ''
  bottamDesabilitado: boolean = false

  constructor(
    private service: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private enviarNome: ValorCompatilhadoService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])]
    })

  }

  // showFormulario() {
  //   console.log(this.formulario)
  // }

  verificarUsuario() {

    const email = this.formulario.value.email
    const password = this.formulario.value.password
    this.service.listarUsuarioPorId(email).subscribe((usuarios) => {
      if (Array.isArray(usuarios) && usuarios.length > 0) {
        const usuarioEncontrado = usuarios.find((usuario) => usuario.password === password)

        if (usuarioEncontrado) {
          this.enviarNome.atualizarNome(usuarioEncontrado.username)
          this.router.navigateByUrl('/home')
        } else {
          this.erroSenha = true
        }

      } else {
        this.usuarioNaoEncontrado = true
      }

    })

  }

  habilitarBotao() {
    if (this.formulario.valid) {
      return 'button-login ';
    }

    return 'button-login-disabled'
  }



}
