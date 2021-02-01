import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  passwordInvalid: boolean = false;

  userNotFould: boolean = false;

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.required),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  exibirPainelCadastro(): void{
    this.exibirPainel.emit('cadastro');
  }

  public login(): void {
    if (this.formulario.valid) {
      this.authService.authentication(this.formulario.value.email, this.formulario.value.senha)
      .then((resp: Error) => {
        if (resp?.message === 'The password is invalid or the user does not have a password.') {
          this.passwordInvalid = true;
          this.userNotFould = false;
        } else if (resp?.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          this.userNotFould = true;
          this.passwordInvalid = false;
        } else {
          this.userNotFould = true;
          this.passwordInvalid = false;
        }
      });
    }
  }
}
