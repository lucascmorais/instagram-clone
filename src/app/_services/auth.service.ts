import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from '../_model/usuario.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token_id: string;

  constructor(
    private firestore: AngularFirestore, 
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  private usuarioCollection: AngularFirestoreCollection<Usuario> = this.firestore.collection('user');

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then(() => {
      delete usuario.senha;
      this.usuarioCollection.doc(btoa(usuario.email)).set(Object.assign({}, usuario));
    })
    .catch((error: Error) => {
      return error;
    })
  }

  public authentication(email: string, senha: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, senha).then(() => {
      this.auth.idToken.subscribe((token: string) => {
        this.token_id = token;
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      })
    })
    .catch((error: Error) => {
      return error;
    })
  }

  public authenticated(): boolean {
    if (this.token_id === undefined && localStorage.getItem('token') != null){
      this.token_id = localStorage.getItem('token');
    }
    if (this.token_id === undefined) {
      this.router.navigate(['/']);
    }
    return this.token_id !== undefined;
  }

  public logout(): void{
    this.auth.signOut()
    .then(() => {
      localStorage.removeItem('token')
      this.router.navigate(['/'])
    });
  }
}