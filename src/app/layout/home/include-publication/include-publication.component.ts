import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';

import { PublicationService } from '../../../_services/publication.service';
import { ProgressService } from '../../../_services/progress.service';
import { Observable, Subject, Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-include-publication',
  templateUrl: './include-publication.component.html',
  styleUrls: ['./include-publication.component.css']
})
export class IncludePublicationComponent implements OnInit {

  @Output() public updateTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email: string;
  public imagem: any;

  public progressPublication: string = 'pending';
  public progressUpload: number;

  destroyed$ = new Subject<void>();
  observable$: Observable<number> = interval(1500);
  subscription$$: Subscription;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private publicationService: PublicationService,
    private auth: AngularFireAuth,
    private progressService: ProgressService
    ) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publish(): void{
    this.publicationService.publish({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    this.subscription$$ = this.observable$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.progressPublication = 'progress'
        this.progressUpload = 
          Math.round((this.progressService.state.bytesTransferred / this.progressService.state.totalBytes) * 100);
        if (this.progressService.status === 'finished') {
          this.progressPublication = 'finished';
          this.updateTimeLine.emit();
          this.destroyed$.next();
        }
      })
  }

  public prepareImageUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
