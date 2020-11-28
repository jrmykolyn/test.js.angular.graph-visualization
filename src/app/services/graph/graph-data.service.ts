import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  constructor() { }

  public get() {
    const data: any = {
      "id": 0,
      "type": "a",
      "subType": "foo",
      "dependencies": [
        {
          "id": 1,
          "type": "b",
          "dependencies": [
            {
              "id": 2,
              "type": "b",
              "dependencies": []
            },
            {
              "id": 3,
              "type": "b",
              "dependencies": [
                {
                  "id": 6,
                  "type": "c"
                }
              ]
            },
          ]
        },
        {
          "id": 4,
          "type": "b",
          "dependencies": []
        },
        {
          "id": 5,
          "type": "b",
          "dependencies": []
        }
      ],
    };

    return data;
  }
}
