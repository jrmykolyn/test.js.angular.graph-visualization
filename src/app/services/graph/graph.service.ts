import { Injectable } from '@angular/core';

// TODO: Type.
declare var sigma: any;

const data: any = {
  "id": 0,
  "type": "a",
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

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }

  init() {
    // Given an array of graph data, return an array of Sigma-type graph 'nodes'.
    const computeNodes = (data, x = 0, y = 0) => {
      return data.map((item, i) => {
        const node = {
          id: item.id,
          x:  (x * (i + 1)) + (i * 1),
          y: y * 1,
          size: 0.5,
        };

        return [node, ...(item.dependencies && item.dependencies.length ? computeNodes(item.dependencies, i, y + 1) : [])];
      }).reduce((acc, arr) => [...acc, ...arr], []);
    };

    // Given an array of graph data, return an array of Sigma-type graph 'edges'.
    const computeEdges = (data, parentId = undefined) => {
      return data.map((item) => {
        return [
          ...(parentId !== undefined ? [{ id: Math.random(), source: parentId, target: item.id }] : []),
          ...(item.dependencies && item.dependencies.length ? computeEdges(item.dependencies, item.id) : []),
        ];
      }).reduce((acc, arr) => [...acc, ...arr], []);
    };

    const nodes = computeNodes([data]);
    const edges = computeEdges([data]);

    const s = new sigma({
      graph: {
        nodes,
        edges,
      },
      container: 'graph-container',
    });
  }
}
