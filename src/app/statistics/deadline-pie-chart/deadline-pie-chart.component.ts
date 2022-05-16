import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { TaskProgressService } from 'src/app/shared/task-progress.service';

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
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private taskManager: TaskProgressService) {
    this.pieChartData = [
      taskManager.getCompleteBeforeDuedate(),
      taskManager.getCompleteAfterDuedate(),
    ];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {}
}
