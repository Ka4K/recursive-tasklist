import { Component, OnInit } from '@angular/core';
import { CalendarData, CalendarOptions } from 'ng-calendar-heatmap';
import { TaskProgressService } from '../shared/task-progress.service';

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
  constructor(private taskProgress: TaskProgressService) {
    this.calendarData = taskProgress.getCalendarData();
  }
  ngOnInit(): void {}
}
