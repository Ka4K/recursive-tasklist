import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowDateComponent } from './show-date/show-date.component';
import { ManipulationTaskComponent } from './manipulation-task/manipulation-task.component';
import { FormsModule } from '@angular/forms';
import { UpdateTaskModalComponent } from './update-task-modal/update-task-modal.component';
import { MakeChildModalComponent } from './make-child-modal/make-child-modal.component';
import { TaskCardComponent } from '../shared/task-card/task-card.component';
import { ShowTaskBodyComponent } from './show-tasks/show-task-body/show-task-body.component';
import { ShowTasksComponent } from './show-tasks/show-tasks.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  declarations: [
    ShowDateComponent,
    ManipulationTaskComponent,
    UpdateTaskModalComponent,
    MakeChildModalComponent,
    TaskCardComponent,
    ShowTaskBodyComponent,
    ShowTasksComponent,
  ],
  exports: [
    ShowDateComponent,
    ManipulationTaskComponent,
    TaskCardComponent,
    ShowTaskBodyComponent,
    ShowTasksComponent,
    MakeChildModalComponent,
  ],
  imports: [IonicModule, CommonModule, FormsModule, ScrollingModule],
})
export class SharedModule {}
