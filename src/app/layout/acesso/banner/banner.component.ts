import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('hide', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hide <=> show', animate('1.5s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public state: string = 'show';

  public imagens: Array<Imagem> = [
    { state: 'show', url: '/assets/banner-acesso/img_1.png'},
    { state: 'hide', url: '/assets/banner-acesso/img_2.png'},
    { state: 'hide', url: '/assets/banner-acesso/img_3.png'},
    { state: 'hide', url: '/assets/banner-acesso/img_4.png'},
    { state: 'hide', url: '/assets/banner-acesso/img_5.png'}
  ]

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.logicRotation(), 5000);
  }

  logicRotation(): void {
    let index: number;
    for (let i = 0; i <= 4; i++) {
      if (this.imagens[i].state === 'show') {
        this.imagens[i].state = 'hide';
        index = i === 4 ? 0 : i+1;
        break;
      }
    }
    this.imagens[index].state = 'show';
    setTimeout(() => this.logicRotation(), 3000);
  }

}
