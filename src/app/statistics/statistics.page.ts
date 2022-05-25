import { Component, OnInit } from '@angular/core';
import { CalendarData, CalendarOptions } from 'ng-calendar-heatmap';
import { TaskProgressService } from '../shared/task-progress.service';
import { ITaskWithComplete } from '../interface/task';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  calendarData: CalendarData[] = [];
  calendarOptions: CalendarOptions = {
    tooltipEnabled: false,
  };
  completedTasks: ITaskWithComplete[];
  constructor(private taskProgress: TaskProgressService) {}
  ngOnInit(): void {
    this.calendarData = this.taskProgress.getCalendarData();
    this.completedTasks = this.taskProgress.getCompletedTasks();
  }
}
