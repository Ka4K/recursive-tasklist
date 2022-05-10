import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ShowTasksComponent } from '../shared/show-tasks/show-tasks.component';
import { SharedModule } from '../shared/shared.module';

import { HomePageRoutingModule } from './home-routing.module';
import { TaskCardComponent } from '../shared/task-card/task-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [HomePage, ShowTasksComponent, TaskCardComponent],
})
export class HomePageModule {}
