import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  public status: string;

  public state: any;

  constructor() { }
}
