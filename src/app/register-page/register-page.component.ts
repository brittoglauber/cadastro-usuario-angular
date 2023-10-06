import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  formulario!: FormGroup

  customPasswordErrors = {
    uppercaseRequired: 'The password should contain at least 1 uppercase character.',
    symbolRequired: 'The password must contain at least one symbol.'
  }

  constructor(
    private service: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
      this.formulario = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          this.passwordValidator
        ])],
        confirmPassword: ['', Validators.compose([
          Validators.required,
        ])]
      }, {
        validator: this.passwordMatchValidator('password', 'confirmPassword')
      })

  }

  criarUsuario() {
    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/'])
      })
    }
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;

    // Verifique se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
      return { 'uppercaseRequired': true };
    }

    // Verifique se a senha contém pelo menos um símbolo (caractere especial)
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return { 'symbolRequired': true };
    }

    // Se a senha passar em ambas as verificações, retorne nulo (válido)
    return null;
  }

  passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {

      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }

    }
  }

  habilitarBotao() {
    if (this.formulario.valid) {
      return 'button-register';
    }

    return 'button-register-disabled'
  }

}
