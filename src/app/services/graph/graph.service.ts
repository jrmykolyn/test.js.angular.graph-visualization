import { Injectable } from '@angular/core';
import { GraphDataService } from './graph-data.service';
import { deepMerge } from '../../utils';

// TODO: Type.
declare var sigma: any;

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private data: any = [this.graphDataService.get()];

  constructor(private graphDataService: GraphDataService) { }

  init(data = this.data) {
    // Given an array of graph data, return an array of Sigma-type graph 'nodes'.
    const computeNodes = (data, x = 0, y = 0) => {
      return data.map((item, i) => {
        const node = {
          id: item.id,
          x:  (x * (i + 1)) + (i * 1),
          y: y * 1,
          size: 0.5,
          // TODO: Delegate UI concerns.
          color: item.__meta && item.__meta.isSelected ? '#ff0000' : '#000000',
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

    const nodes = computeNodes(data);
    const edges = computeEdges(data);

    const s = new sigma({
      graph: {
        nodes,
        edges,
      },
      container: 'graph-container',
    });
  }

  filter(filters) {
    const _filter = (filters, data) => {
      return data.map((item) => {
        return {
          ...item,
          ...(item.dependencies && item.dependencies.length ? { dependencies: _filter(filters, item.dependencies) } : {}),
          __meta: {
            isSelected: Object.entries(filters).every(([key, value]: [any, any]) => key in item && value.includes(item[key])),
          },
        };
      });
    };

    return _filter(filters, this.data);
  }

  computeFilters() {
    // TODO: Make configurable or externalize.
    const whitelist = { type: true, subType: true };

    const _computeFilters = (data) => {
      return data.map((item) => {
        const filters = Object.entries(item)
          .filter(([key]) => whitelist[key])
          .reduce((acc, [key, value]) => ({ ...acc, [key]: [value] }), {});

        const childFilters = item.dependencies && item.dependencies.length
          ? _computeFilters(item.dependencies)
          : {};

        return deepMerge(filters, childFilters);
      }).reduce((acc, o) => deepMerge(acc, o), {});
    };

    const data: any = _computeFilters(this.data);

    return Object.entries(data)
      .map(([label, options]) => ({
        label,
        options: Array.isArray(options)
          ? options.filter((el, i, arr) => i === arr.indexOf(el)).map((value: any) => ({ label: value }))
          : [],
      }));
  }
}
