import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  public filters: any = this.graphService.computeFilters();
  private selectedFilters: any = {};

  constructor(private graphService: GraphService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.graphService.init();
  }

  handleFilterSelection(type, value) {
    this.isFilterSelected(type, value)
      ? this.deselectFilter(type, value)
      : this.selectFilter(type, value);

      this.graphService.init(this.graphService.filter(this.selectedFilters));
  }

  isFilterSelected(type, value) {
    return type in this.selectedFilters && this.selectedFilters[type].includes(value);
  }

  deselectFilter(type, value) {
    this.selectedFilters[type] = this.selectedFilters[type].filter((el) => el !== value);
  };

  selectFilter(type, value) {
    this.selectedFilters[type] = this.selectedFilters[type] ? [...this.selectedFilters[type], value] : [value];
  }
}
