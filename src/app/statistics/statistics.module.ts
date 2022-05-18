import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';
import { DeadlinePieChartComponent } from './deadline-pie-chart/deadline-pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CalendarHeatmapModule } from 'ng-calendar-heatmap';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
    ChartsModule,
    CalendarHeatmapModule,
  ],
  declarations: [StatisticsPage, DeadlinePieChartComponent],
})
export class StatisticsPageModule {}
