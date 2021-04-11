import { Injectable } from '@angular/core';
import DATA from './data.json';

const TYPES = ['a', 'b', 'c', 'd', 'e', 'f'];
const SUBTYPES = ['foo', 'bar', 'baz', 'quux'];
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

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

  public computeData(n = 1) {
    return new Array(Math.ceil(Math.random() * n)).fill(null)
      .map(() => ({
        id: String(Math.random()),
        type: sample(TYPES),
        subType: sample(SUBTYPES),
        dependencies: Math.round(Math.random()) ? this.computeData(n) : [],
      }));
  }
}
