import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PublicationService } from 'src/app/_services/publication.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public publications: any;

  public email: string;

  constructor(private auth: AngularFireAuth,
    private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.email = user.email;
      this.updateTimeLine();
    })
  }

  public updateTimeLine(): void {
    this.publicationService.findPublications(this.email).then((publications) => {
      this.publications = publications;
    })
  }
}
