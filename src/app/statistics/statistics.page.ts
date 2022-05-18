import { Component, OnInit } from '@angular/core';
import { CalendarData, CalendarOptions } from 'ng-calendar-heatmap';
import { Platform } from '@ionic/angular';
import { TaskProgressService } from '../shared/task-progress.service';

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
  constructor(
    private platform: Platform,
    private taskProgress: TaskProgressService
  ) {
    this.calendarOptions.responsive = !platform.is('mobile');
    this.calendarData = taskProgress.getCalendarData();
  }
  ionViewWillEnter() {}
  ngOnInit() {}
}
