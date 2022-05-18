import { Component, OnInit } from '@angular/core';
import { CalendarData, CalendarOptions } from 'ng-calendar-heatmap';
import { Platform } from '@ionic/angular';
import { TaskProgressService } from '../shared/task-progress.service';
import * as moment from 'moment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  calendarData: CalendarData[] = [];
  calendarOptions: CalendarOptions = {
    responsive: true,
    tooltipEnabled: false,
  };
  isMobile: boolean;
  constructor(
    private platform: Platform,
    private taskProgress: TaskProgressService
  ) {
    this.isMobile = platform.is('mobile') && !platform.is('tablet');
    if (this.isMobile) {
      this.calendarOptions.yearAgo = moment()
        .startOf('day')
        .subtract(4, 'month')
        .toDate();
      this.calendarOptions.responsive = false;
    }
    this.calendarData = taskProgress.getCalendarData();
  }
  ionViewWillEnter() {}
  ngOnInit() {}
}
