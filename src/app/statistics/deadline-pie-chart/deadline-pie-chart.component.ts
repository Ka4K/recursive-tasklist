import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'app-deadline-pie-chart',
  templateUrl: './deadline-pie-chart.component.html',
  styleUrls: ['./deadline-pie-chart.component.scss'],
})
export class DeadlinePieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['期限内'], ['遅延']];
  public pieChartData: SingleDataSet = [300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {}
}
