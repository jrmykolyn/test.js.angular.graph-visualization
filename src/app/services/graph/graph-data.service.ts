import { Injectable } from '@angular/core';
import DATA from './data.json';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  constructor() {
    this.computeData = this.computeData.bind(this);
  }

  public get() {
    return [
      ...Object.values(DATA.application),
    ];
  }
}
