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
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[] = [['期限内'], ['遅延']];
  pieChartData: SingleDataSet = [0, 0];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];

  constructor(private taskProgress: TaskProgressService) {}
  ngOnInit(): void {
    this.pieChartData = [
      this.taskProgress.getCompleteBeforeDuedate(),
      this.taskProgress.getCompleteAfterDuedate(),
    ];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
}
