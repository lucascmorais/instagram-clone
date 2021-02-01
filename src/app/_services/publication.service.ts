import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

import { ProgressService } from '../_services/progress.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(
    private database: AngularFireDatabase,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private progress: ProgressService
  ) { }

  publish(publication: any): void {
    this.database.database.ref(`publicacoes/${btoa(publication.email)}`)
      .push({ titulo: publication.titulo})
      .then((res: any) => {
        let nomeImagem = res.key;
        this.storage.upload(`imagens/${nomeImagem}`,publication.imagem).snapshotChanges().subscribe(
          (snapshot) => {
            this.progress.status = 'progress';
            this.progress.state = snapshot
          },
          () => this.progress.status = 'error',
          () => this.progress.status = 'finished'
        );
      }
    );
  }

  public findPublications(emailUser: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.database.database.ref(`publicacoes/${btoa(emailUser)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          let publications: Array<any> = [];
          snapshot.forEach((childSnapshot: any) => {
            let publication = childSnapshot.val();
            publication.key = childSnapshot.key;

            publications.push(publication)
          })
          return publications.reverse();
          // resolve(publications)
        })
        .then((publications: any) => {
          publications.forEach(publication => {
            this.storage.storage.ref().child(`imagens/${publication.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publication.url_image = url;
                this.firestore.collection('user').doc(btoa(emailUser)).valueChanges()
                .subscribe((res: any) => {
                  publication.nome_completo = res.nome_completo;
                })
              })
          })
          resolve(publications)
        })
    });
  }

}