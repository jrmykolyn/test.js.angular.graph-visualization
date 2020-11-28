import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  public filters: any = this.graphService.computeFilters();

  constructor(private graphService: GraphService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.graphService.init();
  }
}
